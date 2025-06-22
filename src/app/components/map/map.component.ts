// map.component.ts

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl';

import { MatDialog } from '@angular/material/dialog';

import { AppMarker } from '../../interfaces/map.interfaces';
import { MarkersService } from '../../services/marker.service';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesFilterComponent } from './categories-filter/categories-filter.component';

interface MarkerAndColor {
  id?: number;
  color: string;
  marker?: Marker;
  lng: string;
  lat: string;
  category?: string;
}

interface PlainMarker {
  id?: number;
  color: string;
  lngLat: number[];
  category?: string;
}

@Component({
    selector: 'app-map',
    imports: [CommonModule, CategoriesComponent, CategoriesFilterComponent, FormsModule,],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss'
})

export default class MapComponent implements AfterViewInit, OnInit {

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];
  public plainMarkers: PlainMarker[] = [];
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-76.59, 39.34);
  public uniqueCategories: string[] = [];

  public categoryColors: Record<string, string> = {
    'garages': '#008000',     // verde
    'info points': '#0000FF', // azul
    'parkings': '#FF0000',    // rojo
  };

  constructor(
    private markersService: MarkersService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    await this.getMarkersFromDatabase();
  }

  async getMarkersFromDatabase() {
    const markers = await this.markersService.getMarkers().toPromise();
    if (markers) {
      for (const marker of markers) {
        await this.addMarker(marker, false);
      }
    }
    this.saveToLocalStorage();
    this.readFromLocalStorage();
    this.uniqueCategories = [...new Set(this.plainMarkers.map(marker => marker.category).filter(category => category !== undefined) as string[])];
  }

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentLngLat,
      zoom: 13,
    });
  }

  async openDialog(): Promise<string> {
    const dialogRef = this.dialog.open(CategoriesComponent);
    const result = await dialogRef.afterClosed().toPromise();
    return result;
  }

  async createMarker() {
    if (!this.map) return;

    const categoryColors: Record<string, string> = {
      'garages': '#008000',     // verde
      'info points': '#0000FF', // azul
      'parkings': '#FF0000',    // rojo
    };

    const lngLat = this.map.getCenter();
    const category = await this.openDialog();
    if (category) {
      const color = categoryColors[category];

      const newMarker: AppMarker = { color, lng: lngLat.lng.toString(), lat: lngLat.lat.toString(), category };

      const addedMarker = await this.markersService.addMarker(newMarker).toPromise();
      if (addedMarker) {
        this.saveToLocalStorage();
        await this.addMarker(addedMarker, true);
        this.uniqueCategories = [...new Set(this.plainMarkers.map(marker => marker.category).filter(category => category !== undefined) as string[])];
      }
    }
  }

  async addMarker(appMarker: AppMarker, isNewMarker: boolean = true) {
    if (!this.map) return;
    const { id, lng, lat, color, category } = appMarker;
    const marker = new Marker({ color, draggable: true }).setLngLat(new LngLat(Number(lng), Number(lat))).addTo(this.map);
    marker.on('dragend', () => {
      const lngLat = marker.getLngLat();
      const updatedMarker: AppMarker = { id, color, lng: lngLat.lng.toString(), lat: lngLat.lat.toString(), category };
      this.markersService.updateMarker(updatedMarker).subscribe(() => {
        this.saveToLocalStorage();
      });
    });
    const newMarker: MarkerAndColor = { id, color, marker, lng: lng.toString(), lat: lat.toString(), category };

    const existingPlainMarker = this.plainMarkers.find(pm => pm.id === id);
    if (!existingPlainMarker) {
      this.plainMarkers.push({ id, color, lngLat: marker.getLngLat().toArray(), category });
    }

    this.markers.push(newMarker);
    if (isNewMarker) {
      const updatedMarker: AppMarker = { id, color, lng, lat, category };
      await this.markersService.updateMarker(updatedMarker).toPromise();
      this.saveToLocalStorage();
    }
  }

  /* async deleteMarker(index: number) {
    const marker = this.markers[index];
    if (marker && marker.id !== undefined) {
      await this.markersService.deleteMarkerById(marker.id).toPromise();
      marker.marker?.remove();
      this.markers.splice(index, 1);
      this.plainMarkers.splice(index, 1);
    }
  } */

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers
      .filter(({ id, color, marker }) => id !== undefined && color && marker)
      .map(({ id, color, marker, category }) => {
        return { id: id!, color: color!, lngLat: marker!.getLngLat().toArray(), category };
      });
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);
    this.markers.forEach(({ marker }) => marker?.remove());
    this.markers = [];
    plainMarkers.forEach(({ id, color, lngLat, category }) => {
      const [lng, lat] = lngLat;
      const coords = { id, lng: lng.toString(), lat: lat.toString(), color, category };
      const existingMarker = this.markers.find(m => m.marker && m.color === color && m.marker.getLngLat().lng === Number(lng) && m.marker.getLngLat().lat === Number(lat));
      if (!existingMarker) {
        this.addMarker(coords, false);
      }
    });
  }

  filter: Record<string, boolean> = {
    garages: true,
    'info points': true,
    parkings: true,
  };

  filterChange = new EventEmitter<Record<string, boolean>>();

  onFilterChange(value: boolean) {
    this.filterChange.emit(this.filter);
  }

  updateMarkers() {
    for (const marker of this.markers) {
      if (marker.category && this.filter[marker.category]) {
        if (this.map) {
          marker.marker?.addTo(this.map);
        }
      } else {
        marker.marker?.remove();
      }
    }
  }

}


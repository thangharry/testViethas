import { Component } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'text-angular';

  selectedShapes: Array<{
    shape: 'square' | 'circle' | 'squareboder';
    effect: 'default' | 'zoom' | 'blur' | 'shadow';
    hoverEffect: 'default' | 'zoom' | 'blur' | 'shadow';
    position: { x: number; y: number };
    shadow?: string;
  }> = [];
  selectedShape: {
    shape: 'square' | 'circle' | 'squareboder';
    effect: 'default' | 'zoom' | 'blur' | 'shadow';
    hoverEffect: 'default' | 'zoom' | 'blur' | 'shadow';
    position: { x: number; y: number };
    shadow?: string;
  } | null = null;
  effectToApply: 'default' | 'zoom' | 'blur' | 'shadow' = 'default';
  handleImg(shape: 'square' | 'circle' | 'squareboder') {
    alert('đã thêm vật thể thành công');
    const newShape: {
      shape: 'square' | 'circle' | 'squareboder';
      effect: 'default' | 'zoom' | 'blur' | 'shadow';
      hoverEffect: 'default' | 'zoom' | 'blur' | 'shadow';
      position: { x: number; y: number };
      shadow?: string;
    } = {
      shape,
      effect: 'default' as 'default' | 'zoom' | 'blur' | 'shadow',
      hoverEffect: 'default' as 'default' | 'zoom' | 'blur' | 'shadow',
      position: { x: 0, y: 0 },

      shadow:
        this.selectedShadow === 'default' ? undefined : this.selectedShadow,
    };
    this.selectedShapes.push(newShape);
    this.selectedShape = newShape;
    localStorage.setItem('selectedShapes', JSON.stringify(this.selectedShapes));
  }
  selectedShadow: string | undefined;
  selectShape(shape: {
    shape: 'square' | 'circle' | 'squareboder';
    effect: 'default' | 'zoom' | 'blur' | 'shadow';
    hoverEffect: 'default' | 'zoom' | 'blur' | 'shadow';
    position: { x: number; y: number };
    shadow?: string;
  }) {
    this.selectedShape = shape;
    if (this.selectedShadow && shape.shape === 'circle') {
      this.selectedShape.shadow = this.selectedShadow;
    }
  }
  removeShape(index: number) {
    this.selectedShapes.splice(index, 1);
    if (this.selectedShape === this.selectedShapes[index]) {
      this.selectedShape = null;
    }
  }
  applyEffect(effect: 'default' | 'zoom' | 'blur' | 'shadow') {
    this.effectToApply = effect;
  }
  applyEffectToShape(shape: {
    shape: 'square' | 'circle' | 'squareboder';
    effect: 'default' | 'zoom' | 'blur' | 'shadow';
    hoverEffect: 'default' | 'zoom' | 'blur' | 'shadow';
    position: { x: number; y: number };
  }) {
    shape.hoverEffect = this.effectToApply;
  }

  removeEffectFromShape(shape: {
    shape: 'square' | 'circle' | 'squareboder';
    effect: 'default' | 'zoom' | 'blur' | 'shadow';
    hoverEffect: 'default' | 'zoom' | 'blur' | 'shadow';
    position: { x: number; y: number };
  }) {
    shape.hoverEffect = 'default';
  }
  dragEnded(
    event: CdkDragEnd,
    shape: {
      shape: 'square' | 'circle' | 'squareboder';
      effect: 'default' | 'zoom' | 'blur' | 'shadow';
      hoverEffect: 'default' | 'zoom' | 'blur' | 'shadow';
      position: { x: number; y: number };
    }
  ) {
    shape.position = event.source.getFreeDragPosition();
    localStorage.setItem('selectedShapes', JSON.stringify(this.selectedShapes));
  }
  applyShadow(style: string) {
    switch (style) {
      case 'style1':
        if (this.selectedShape) {
          this.selectedShape.shadow = '10px 10px 5px grey';
        }
        break;
      case 'style2':
        if (this.selectedShape) {
          this.selectedShape.shadow = '-12px 10px 5px 0px rgba(0,0,0,0.75)';
        }
        break;
      case 'style3':
        if (this.selectedShape) {
          this.selectedShape.shadow = '0px 0px 18px 0px rgba(0,0,0,0.75)';
        }
        break;
      case 'default':
        if (this.selectedShape) {
          this.selectedShape.shadow = undefined;
        }
        break;
    }
  }

  openMap: { [name: string]: boolean } = {};

  isOpen(name: string): boolean {
    return this.openMap[name] ?? false;
  }

  toggleOpen(name: string): void {
    this.openMap[name] = !this.isOpen(name);
  }
}

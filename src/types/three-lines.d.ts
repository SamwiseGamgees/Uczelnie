declare module 'three/examples/jsm/lines/LineMaterial' {
    import { Material, Color } from 'three';
    export class LineMaterial extends Material {
      color: Color;
      linewidth: number;
      resolution: { x: number; y: number };
      dashed: boolean;
      dashOffset: number;
      dashScale: number;
      dashSize: number;
      gapSize: number;
      alphaToCoverage: boolean;
      constructor(parameters?: any);
      copy(source: LineMaterial): this;
    }
  }
  
  declare module 'three/examples/jsm/lines/LineGeometry' {
    import { BufferGeometry } from 'three';
    export class LineGeometry extends BufferGeometry {
      setPositions(array: number[] | Float32Array): this;
      setColors(array: number[] | Float32Array): this;
    }
  }
  
  declare module 'three/examples/jsm/lines/Line2' {
    import { LineSegments, BufferGeometry, Material } from 'three';
    export class Line2 extends LineSegments {
      constructor(geometry?: BufferGeometry, material?: Material);
      computeLineDistances(): this;
    }
  }
  
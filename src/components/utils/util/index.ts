export const isDev = process.env.NODE_ENV === "development";

interface Uniform {
  value: any;
  min?: number;
  max?: number;
  step?: number;
}

interface Uniforms {
  [key: string]: Uniform;
}

interface Control {
  value: any;
  min: number;
  max: number;
  step: number;
  onChange: (val: any) => void;
}

interface Controls {
  [key: string]: Control;
}

export function getControlsFromUniforms(
  uniforms: Uniforms,
  ref: React.RefObject<{ uniforms: Uniforms }>
): Controls {
  return Object.keys(uniforms).reduce((acc: Controls, key: string) => {
    const uniform = uniforms[key];
    const isColor = uniform.value?.isColor;
    if (key !== "uTime") {
      acc[key] = {
        value: isColor ? `#${uniform.value.getHexString()}` : uniform.value,
        min: uniform.min || 0,
        max: uniform.max || 10,
        step: uniform.step || 0.1,
        onChange: (val: any) => {
          if (isColor) {
            ref.current!.uniforms[key].value.set(val);
          } else {
            ref.current!.uniforms[key].value = val;
          }
        },
      };
    }

    return acc;
  }, {});
}

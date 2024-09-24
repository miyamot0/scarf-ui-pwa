import type { RefObject } from 'react';

type ImageFormatTypes = 'svg' | 'png' | 'jpeg' | 'webp';

function download(href: string, name: string) {
  const link = document.createElement('a');
  link.download = name;
  link.style.opacity = '0';
  document.body.append(link);
  link.href = href;
  link.click();
  link.remove();
}

export function ExtractRelevantImage(ref: RefObject<HTMLDivElement | null>) {
  if (ref === null || !ref.current) {
    throw new Error('Ref is null');
  }

  const svg_element = ref.current.getElementsByClassName('recharts-surface');

  if (svg_element && svg_element.length === 1) {
    return svg_element[0] as SVGSVGElement;
  }

  throw new Error('SVG Element not found');
}

export function FigureOutputExportNew(format: ImageFormatTypes, filename: string, figure: SVGSVGElement) {
  figure.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  figure.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

  const blob = new Blob([figure.outerHTML], {
    type: 'image/svg+xml;charset=utf-8',
  });

  if (format === 'svg') {
    download(window.URL.createObjectURL(blob), `${filename}.${format}`);
  } else if (figure) {
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(blob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = figure.clientWidth;
      canvas.height = figure.clientHeight;

      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas context not found');

      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.drawImage(image, 0, 0, figure.clientWidth, figure.clientHeight);

      switch (format) {
        case 'png':
          download(canvas.toDataURL(), `${filename}.${format}`);
          break;
        case 'jpeg':
          download(canvas.toDataURL('image/jpeg'), `${filename}.${format}`);
          break;
        case 'webp':
          download(canvas.toDataURL('image/webp'), `${filename}.${format}`);
          break;
      }
    };
    image.src = blobURL;
  }
}

/*
export function FigureOutputExport(
    format: ImageFormatTypes,
    filename: string,
    figureRef?: RefObject<SVGSVGElement>
) {
    throw new Error('Deprecated, use FigureOutputExportNew instead')

    let svg = figureRef?.current
    if (!svg) throw new Error('SVG Element not found')

    // @ts-ignore
    const component = svg.container.querySelector('svg')
    if (!component) throw new Error('SVG Element not found')
    component.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    component.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')

    const blob = new Blob([component.outerHTML], {
        type: 'image/svg+xml;charset=utf-8',
    })

    if (format === 'svg') {
        download(window.URL.createObjectURL(blob), `${filename}.${format}`)
    } else if (svg) {
        const URL = window.URL || window.webkitURL || window
        const blobURL = URL.createObjectURL(blob)

        const image = new Image()
        image.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = component.clientWidth
            canvas.height = component.clientHeight

            const context = canvas.getContext('2d')
            if (!context) throw new Error('Canvas context not found')

            context.fillStyle = '#FFFFFF'
            context.fillRect(0, 0, canvas.width, canvas.height)

            context.drawImage(
                image,
                0,
                0,
                component.clientWidth,
                component.clientHeight
            )

            switch (format) {
                case 'png':
                    download(canvas.toDataURL(), `${filename}.${format}`)
                    break
                case 'jpeg':
                    download(
                        canvas.toDataURL('image/jpeg'),
                        `${filename}.${format}`
                    )
                    break
                case 'webp':
                    download(
                        canvas.toDataURL('image/webp'),
                        `${filename}.${format}`
                    )
                    break
            }
        }
        image.src = blobURL
    }
}
*/

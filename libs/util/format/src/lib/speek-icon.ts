import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'

export function getLogo(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 942.886 977.085" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
  <g id="Grupo_1" data-name="Grupo 1" transform="translate(0 0)">
    <path fill="${color}" id="Fire" data-name="Caminho 3" d="M531.453,439.99c21.134-39.384,20.176-80.573,8.177-122.244-2.95-10.254-9.09-27.837-13.234-39.332,70.654,52.212,130.991,177.756,100.322,302.52-28.412,115.6-139.2,208.7-253.489,219.468-147.179,13.86-261.615-74.333-304.685-181.55-45.929-114.307-9.149-254.893,69.788-324.884-38.625,77.766-26.67,139.5-10.887,162.538,17.543,25.605,45.472,38.883,72.731,31.3,28.655-7.97,50.64-33.609,50.142-66.3-.331-21.826-4.225-46.441-12.832-66.105-51.074-116.671-8.5-221.892,73.88-294.354C335.277,40.017,363.078,19.834,398.469,0c-38.887,55.214-45.494,122.487-15.948,185.09,17.326,34.113,39.52,69.741,59.107,102.653,35.2,59.155,56.787,119.975,47.439,190.537-.1.781,28-10.891,42.386-38.294" transform="translate(129.982 0)"></path>
  </g>
</svg>`
}

export function createSpeekIcon(
  registry: MatIconRegistry,
  sanitizer: DomSanitizer
) {
  const speekDarkIcon = sanitizer.bypassSecurityTrustHtml(getLogo('#d32f2f'))
  registry.addSvgIconLiteral('speek-dark', speekDarkIcon)

  const speekLightIcon = sanitizer.bypassSecurityTrustHtml(getLogo('#03a9f4'))
  registry.addSvgIconLiteral('speek-light', speekLightIcon)
}

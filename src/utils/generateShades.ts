import { ColorTranslator } from "colortranslator"
import Values from "values.js"

export const generateShades = (color: string, domain: number) => {
  const currentColor = ColorTranslator.toHEX(color)
  if (domain <= 0) {
    return currentColor
  }
  let values = new Values(currentColor)
  let tintColor = values.tints(domain)
  const [r, g, b] = tintColor[0].rgb
  const toReturn = ColorTranslator.toHEX(`rgb(${r}, ${g}, ${b})`)
  return toReturn
}

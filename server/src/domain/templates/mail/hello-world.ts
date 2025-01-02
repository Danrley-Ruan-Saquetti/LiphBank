export type HelloWorldTemplateVariables = {
  name: string
  code: string
}

export const HelloWorldTemplate = `
Hello {{name}}, your code is {{code}}!
`
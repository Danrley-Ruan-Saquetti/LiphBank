export type UserSignInTemplateVariables = {
  name: string
  code: string
}

export const UserSignInTemplate = `
Hello {{name}}, your code is {{code}}!
`
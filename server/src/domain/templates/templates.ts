import { HelloWorldTemplate, HelloWorldTemplateVariables } from '@domain/templates/mail/hello-world'

export namespace Templates {
  export type Variables = {
    'mail/hello-world': HelloWorldTemplateVariables
  }

  export const Templates: Record<keyof Variables, string> = {
    'mail/hello-world': HelloWorldTemplate
  }
}


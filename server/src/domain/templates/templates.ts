import { UserLoggedInTemplate, UserLoggedInTemplateVariables } from '@domain/templates/mail/user-logged-in.template'

export namespace Templates {
  export type Variables = {
    'mail/user-logged-in': UserLoggedInTemplateVariables
  }

  export const Templates: Record<keyof Variables, string> = {
    'mail/user-logged-in': UserLoggedInTemplate
  }
}


import { UserSignInTemplate, UserSignInTemplateVariables } from '@domain/templates/mail/user-sign-in.template'

export namespace Templates {
  export type Variables = {
    'mail/user-sign-in': UserSignInTemplateVariables
  }

  export const Templates: Record<keyof Variables, string> = {
    'mail/user-sign-in': UserSignInTemplate
  }
}


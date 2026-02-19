export type LoginDto = {
  email: string
  password: string
}

export type LoginResponse = {
  mfaEnabled: true
  tempToken: string
}

export type GenerateMfaResponse = {
  manualCode: string
  qrCode: string
}

export const MAX_IMAGE_SIZE_MB = 5
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024

export const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg']

export const UPLOAD_ERROR_MESSAGES = {
  invalidType: 'JPG 또는 PNG 파일만 업로드 가능합니다.',
  tooLarge: `${MAX_IMAGE_SIZE_MB}MB 이하의 이미지만 업로드 가능합니다.`,
}

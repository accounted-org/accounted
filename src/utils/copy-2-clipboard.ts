export async function copy2Clipboard(text: string, fallback?: () => void) {
  if (!navigator.clipboard) {
    return fallback?.();
  }

  await navigator.clipboard.writeText(text);
}

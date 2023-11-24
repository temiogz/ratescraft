export class TextToHexConverter {
  /**
   * Generates hex.
   * @returns hexadecimal value generated from the text.
   */
  public t2hex(text: string): string {
    const hexArray = new Array(text.length);
    for (let i = 0; i < text.length; i++) {
      hexArray[i] = text.charCodeAt(i).toString(16);
    }
    return "0x" + hexArray.join("");
  }
}

export class HexToTextConverter {
  /**
   * Generates text.
   * @returns text generated from the hexadecimal value.
   */
  public static hex2t(hex: string): string {
    if (!hex) return "";
    const hexPairs = hex.match(/.{1,2}/g);
    if (!hexPairs) return "";
    return String.fromCharCode(...hexPairs.map((byte) => parseInt(byte, 16)));
  }
}

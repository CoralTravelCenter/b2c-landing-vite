String.prototype.padOrTrimTo = function (width) {
  const free_spaces = width - this.length;
  if (free_spaces > 0) {
    const add_one = free_spaces % 2;
    const pad = Math.floor(free_spaces / 2);
    const padding = ' '.repeat(pad);
    return padding + this + padding + (add_one ? ' ' : '');
  } else if (free_spaces < 0) {
    return this.substring(0, width);
  }
}

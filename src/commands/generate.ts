function isFileContent(value: unknown): boolean {
  return (
    typeof value === "string" ||
    value === null ||
    (typeof value === "object" && value != null && "template" in value)
  );
}

export function shortenText(description, descriptionLength) {
  if (description.length > descriptionLength) {
    return `${description.substring(0, descriptionLength)}...`
  }
  return description
}
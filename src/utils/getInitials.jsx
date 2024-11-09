export function getInitials(name) {
  const nameParts = name.trim().split(" ");
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  } else {
    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[1].charAt(0).toUpperCase()
    );
  }
}

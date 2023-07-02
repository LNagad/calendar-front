export const formatDisplayName = (displayName) => {
   const wordsList = displayName.split(' ');
   const newDisplayName = wordsList
      .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  
   return newDisplayName;
};
  
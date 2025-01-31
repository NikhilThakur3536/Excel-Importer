// backend/config/validation.ts
export const validationRules = {
    requiredFields: ['Name', 'Amount', 'Date', 'Verified'],
    amount: { min: 0 },
    dateValidation: (date: Date): boolean => {
      const now = new Date();
      console.log("hyy there");
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }
  };
  // hyyyy
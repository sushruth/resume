export const getTemplateMode = (): 'legacy' | 'theme' => {
  const mode = process.env.RESUME_TEMPLATE_MODE;
  if (mode === 'theme') return 'theme';
  return 'legacy';
};

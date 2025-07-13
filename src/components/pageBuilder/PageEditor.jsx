// Add error handling at the top of the component
const PageEditor = ({ initialPage, onSave, previewMode = false }) => {
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Existing state declarations...

  // Update handleSave function
  const handleSave = async () => {
    if (!page.title) {
      toast.error('Page title is required');
      return;
    }

    if (!page.slug) {
      toast.error('Page URL slug is required');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await onSave(page);
      toast.success('Page saved successfully');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to save page: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Add error display
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-medium">Error</h3>
        <p className="text-red-600">{error}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => setError(null)}
        >
          Try Again
        </Button>
      </div>
    );
  }

  // Rest of the component code...
  
  // Update save button to show loading state
  <Button 
    variant="primary" 
    className="w-full" 
    onClick={handleSave}
    loading={isSaving}
  >
    <SafeIcon icon={isSaving ? FiLoader : FiSave} className="mr-2" />
    {isSaving ? 'Saving...' : 'Save Page'}
  </Button>
};
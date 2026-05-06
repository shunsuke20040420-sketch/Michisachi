import SfCategoryEnglish from './shared-flow/SfCategoryEnglish.jsx';
import SfSharedAdapt from './shared-flow/SfSharedAdapt.jsx';
import SfSharedDetail from './shared-flow/SfSharedDetail.jsx';
import SfSharedImported from './shared-flow/SfSharedImported.jsx';
import SfSharedLibrary from './shared-flow/SfSharedLibrary.jsx';
import SfSharedPopular from './shared-flow/SfSharedPopular.jsx';
import SfSharedProfile from './shared-flow/SfSharedProfile.jsx';
import SfSharedSaved from './shared-flow/SfSharedSaved.jsx';
import SfLayout from './shared-flow/SfLayout.jsx';

const PAGE_MAP = {
  'shared-library':          SfSharedLibrary,
  'shared-popular':          SfSharedPopular,
  'shared-saved':            SfSharedSaved,
  'shared-detail':           SfSharedDetail,
  'shared-adapt':            SfSharedAdapt,
  'shared-imported':         SfSharedImported,
  'shared-profile':          SfSharedProfile,
  'shared-category-english': SfCategoryEnglish,
};

export default function SharedFlowPage({ page }) {
  const PageComponent = PAGE_MAP[page.key];
  if (!PageComponent) return null;

  return (
    <div className="sf-page">
      <SfLayout pageKey={page.key}>
        <PageComponent />
      </SfLayout>
    </div>
  );
}

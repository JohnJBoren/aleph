import React from 'react';
import { withRouter } from 'react-router';
import { injectIntl, defineMessages } from 'react-intl';

import ViewItem from "src/components/ViewsMenu/ViewItem";

import './ViewsMenu.css';

const messages = defineMessages({
  info: {
    id: 'document.mode.text.info',
    defaultMessage: 'Overview',
  },
  documents: {
    id: 'document.mode.text.documents',
    defaultMessage: 'Browse as a folder',
  },
  xref: {
    id: 'document.mode.text.xref',
    defaultMessage: 'Cross-reference',
  }
});


class CollectionViewsMenu extends React.Component {
  render() {
    const { intl, isPreview, collection, activeMode } = this.props;
    return (
      <div className='ViewsMenu'>
        {isPreview && (
          <ViewItem mode='info' activeMode={activeMode} isPreview={isPreview}
                  message={intl.formatMessage(messages.info)}
                  icon='fa-info' />
        )}
        <ViewItem mode='documents' activeMode={activeMode} isPreview={isPreview}
                  message={intl.formatMessage(messages.documents)}
                  href={`/collections/${collection.id}/documents`}
                  icon='fa-folder-open' />
        <ViewItem mode='xref' activeMode={activeMode} isPreview={isPreview}
                  message={intl.formatMessage(messages.xref)}
                  href={`/collections/${collection.id}/xref`}
                  icon='fa-folder-open' />
      </div>
    );
  }
}

CollectionViewsMenu = injectIntl(CollectionViewsMenu);
CollectionViewsMenu = withRouter(CollectionViewsMenu);
export default CollectionViewsMenu;
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Map')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'cuisine', 'craving'].includes(item.getId()!),
      ),
      S.listItem()
        .title('Categories')
        .child(
          S.documentTypeList('category')
            .title('Categories')
            .filter('_type == "category"')
            .canHandleIntent((intent, {type}) => type === 'category')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('category')
                .views([
                  S.view.form(),
                ])
            )
            .menuItems(S.documentTypeList('category').getMenuItems())
            .title('Categories')
            // .order([{ field: 'title', direction: 'asc' }]) // Sort categories by title in ascending order
        ),
      S.documentTypeListItem('cuisine').title('Cuisines'),
      S.documentTypeListItem('craving').title('Cravings'),
    ])
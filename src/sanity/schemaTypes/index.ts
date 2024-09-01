import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {seasonType} from './seasonType' // Corrected to match the actual file name    
import {languagesType} from './languagesType'
import {explorerType} from './explorerType'
import {accessibilityType} from './accessibilityType'
import {participantType} from './participantType'
import {cuisineType} from './cuisineType'
import {cravingType} from './cravingType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, seasonType, languagesType, explorerType, accessibilityType, participantType, cuisineType, cravingType],
}


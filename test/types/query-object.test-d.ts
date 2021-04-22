import { expectAssignable, expectNotAssignable } from 'tsd'
import { EntryFields } from '../../lib'
import { EqualityQueries, InequalityQueries } from '../../lib/types/query/equality'
import { ExistenceQueries } from '../../lib/types/query/existence'
import { LocationSearchFilters } from '../../lib/types/query/location'
import { RangeFilters } from '../../lib/types/query/range'
import { FullTextSearchFilters } from '../../lib/types/query/search'
import { SelectQueries } from '../../lib/types/query/select'
import { SubsetFilters } from '../../lib/types/query/subset'

const stringValue = ''
const booleanValue = true
const objectValue = { hello: 'world' }

expectAssignable<EqualityQueries<{ testField: EntryFields.Object }, 'fields'>>({
  'fields.testField': objectValue
})
expectAssignable<InequalityQueries<{ testField: EntryFields.Object }, 'fields'>>({
  'fields.testField[ne]': objectValue
})
expectAssignable<ExistenceQueries<{ testField: EntryFields.Object }, 'fields'>>(
  { 'fields.testField[exists]': booleanValue }
)
expectNotAssignable<LocationSearchFilters<{
  testField: EntryFields.Object;
}, 'fields'>>(
  {
    'fields.testField[near]': objectValue,
    'fields.testField[within]': [0, 0, 0]
  }
)
expectNotAssignable<RangeFilters<{ testField: EntryFields.Object }, 'fields'>>(
  {
    'fields.testField[lt]': objectValue,
    'fields.testField[lte]': objectValue,
    'fields.testField[gt]': objectValue,
    'fields.testField[gte]': objectValue
  }
)
expectAssignable<FullTextSearchFilters<{ testField: EntryFields.Object }, 'fields'>>(
  { 'fields.testField[match]': stringValue }
)
expectAssignable<SelectQueries<{ testField: EntryFields.Object }, 'fields'>>(
  {
    'select': ['fields.testField']
  }
)
expectNotAssignable<SubsetFilters<{ testField: EntryFields.Object }, 'fields'>>(
  {
    'fields.testField[in]': objectValue,
    'fields.testField[nin]': objectValue
  }
)
expectNotAssignable<SubsetFilters<{ testField: EntryFields.Object }, 'fields'>>(
  {
    'fields.testField[in]': stringValue,
    'fields.testField[nin]': stringValue
  }
)
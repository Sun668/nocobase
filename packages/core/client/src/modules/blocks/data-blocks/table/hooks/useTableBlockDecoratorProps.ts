/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useFieldSchema } from '@formily/react';
import { useMemo } from 'react';
import { useParsedFilter } from '../../../../../block-provider/hooks/useParsedFilter';
import { useParentRecordCommon } from '../../../useParentRecordCommon';

export const useTableBlockDecoratorProps = (props) => {
  const params = useTableBlockParams(props);
  const parentRecord = useParentRecordCommon(props.association);

  return {
    params,
    parentRecord,
  };
};

export function useTableBlockParams(props) {
  const fieldSchema = useFieldSchema();
  const { filter: parsedFilter } = useParsedFilter({
    filterOption: props.params?.filter,
  });

  return useMemo(() => {
    const params = props.params || {};

    // 1. sort
    const { dragSortBy } = fieldSchema?.['x-decorator-props'] || {};
    if (props.dragSort && dragSortBy) {
      params['sort'] = dragSortBy;
    }

    // 2. filter
    const paramsWithFilter = {
      ...params,
      filter: parsedFilter,
    };

    return paramsWithFilter;
  }, [fieldSchema, parsedFilter, props.dragSort, props.params]);
}

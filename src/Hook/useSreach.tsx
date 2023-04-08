import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { schema, Schema } from '../utils/rule'
import useQueryParam from './useQueryParam'
import { createSearchParams, useNavigate } from 'react-router-dom'
import Path from '../constants/path'

type FromData = Pick<Schema, 'search'>
const schemaSearch = schema.pick(['search'])
export default function useSreach() {
  const { handleSubmit, register } = useForm<FromData>({
    defaultValues: {
      search: ''
    },
    resolver: yupResolver(schemaSearch)
  })

  const queryParam = useQueryParam()
  const navigate = useNavigate()

  const handleSearch = handleSubmit((data) => {
    const queryParams = queryParam.order ? omit(queryParam, ['order', 'sort_by']) : queryParam

    navigate({
      pathname: Path.Home,
      search: createSearchParams({ ...queryParams, name: data.search }).toString()
    })
  })
  return { handleSearch, register }
}

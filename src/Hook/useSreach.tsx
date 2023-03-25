import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { schema, Schema } from '../utils/rule'
import useQueryParam from './useQueryParam'
import { createSearchParams, useNavigate } from 'react-router-dom'
import Path from '../constants/path'

type FromData = Pick<Schema, 'search'>
const schemaSreach = schema.pick(['search'])
export default function useSreach() {
  const { handleSubmit, register } = useForm<FromData>({
    defaultValues: {
      search: ''
    },
    resolver: yupResolver(schemaSreach)
  })

  const queryParam = useQueryParam()
  const navigate = useNavigate()

  const handleSreach = handleSubmit((data) => {
    const queryparamall = queryParam.order ? omit(queryParam, ['order', 'sort_by']) : queryParam

    navigate({
      pathname: Path.Home,
      search: createSearchParams({ ...queryparamall, name: data.search }).toString()
    })
  })
  return { handleSreach, register }
}

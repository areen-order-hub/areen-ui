import { useSelector } from 'react-redux';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

const useGetFieldFromObjects = (reducer, path, notFoundValue = undefined) =>
  useSelector(({ [reducer]: obj }) => _get(obj, path, notFoundValue), _isEqual);

export default useGetFieldFromObjects;


/* eslint-disable jsx-a11y/label-has-associated-control, no-underscore-dangle */
import React from 'react';
import CardMediaType001 from '~/components/misc/CardMediaType001';
import {
  FormImageButtonWithMask,
} from '~/components/FormInputs';
import {
  ExtraChildren,
} from '~/utils/InputLinker';
import {
  EditableConfig,
} from '~/components/LinkerPresets/ConfigCreators';

export default (height = 150) => new EditableConfig({
  component: CardMediaType001,
  converter: { fromView: ([fileInfo]) => fileInfo.dataURL },
  mwRender: ({ value }) => ({ image: value, style: { height } }),
}, null, null, null, ({ value, handleChange, link: { uniqueName } }) => ({
  image: value,
  [ExtraChildren]: (
    <FormImageButtonWithMask
      key={`${uniqueName}-img-input-button`}
      id={`${uniqueName}-img-input-button`}
      onLoadEnd={handleChange}
    />
  ),
}));

import {useDispatch, useSelector} from "react-redux";
import {patchUserProfile, setCreatureColor} from "../../actions/creators/profile";
import {useProfileColors} from "../../hooks";
import Button from "../ui/Button";
import { useDebouncedCallback } from 'use-debounce';


export const ProfileForm = () => {
  const {mainColor, secondaryColor, eyeColor} = useProfileColors();

  const userId = useSelector(({auth}) => {
    return auth.user.id;
  });

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(patchUserProfile(userId, {
      mainColor,
      secondaryColor,
      eyeColor
    }));
  }

  const onColorPickerChange = (event) => {
    const element = event.target;
    const targetProperty = element.name;
    const colorValue = element.value;

    dispatch(setCreatureColor(targetProperty, colorValue));
  }

  const debouncedColorPickerChange = useDebouncedCallback(
    (event) => {
      const element = event.target;
      const targetProperty = element.name;
      const colorValue = element.value;

      dispatch(setCreatureColor(targetProperty, colorValue));
    },
    // delay in ms
    1000
  );

  return <form onSubmit={onSubmit}>
    <div className="mb-4 flex justify-between">
      <label htmlFor="mainColor">Main Color</label>
      <input type="color" name="mainColor" id="mainColor" defaultValue={mainColor} onChange={debouncedColorPickerChange}/>
    </div>
    <div className="mb-4 flex justify-between">
      <label htmlFor="secondaryColor">Secondary Color</label>
      <input type="color" name="secondaryColor" id="secondaryColor" defaultValue={secondaryColor} onChange={(event) => debouncedColorPickerChange(event)}/>
    </div>
    <div className="mb-4 flex justify-between">
      <label htmlFor="eyeColor">Eye Color</label>
      <input type="color" name="eyeColor" id="eyeColor" value={eyeColor} onChange={onColorPickerChange}/>
    </div>

    <div className="text-center">
      <Button type="submit" title="Save">Save</Button>
    </div>
  </form>;
};

export default ProfileForm;

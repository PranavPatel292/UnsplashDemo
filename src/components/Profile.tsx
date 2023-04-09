// this component is responsible for showing the profile icon and user's first name
// and last name
import { unsplashImageData } from "../interfaces/unsplashImageData";

// defining the interface for the Profile.
interface ProfilePros {
  data: unsplashImageData;
}

export const Profile = ({ data }: ProfilePros) => {
  return (
    <>
      {data.user.profile_image.large ? (
        <div className="mb-20 inset-0 pb-5">
          <div className=" inset-0  flex items-end space-y-5 justify-left ml-1">
            <div className="flex flex-row space-x-2">
              <div>
                <img
                  src={data.user.profile_image.large}
                  alt={data.user.id}
                  className="w-5 h-5 rounded-full"
                />
              </div>
              <div>
                <p className="text-sm text-white">{`${
                  data.user.first_name + " " + data.user.last_name
                }`}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

import { useState } from "react";
import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import SideBar from "../../components/SideBar/SideBar";
import ImageContainer from "../../components/image/Image";
import useGetUserDetailsQuery from "../../hooks/use-GetUserDetailsQuery";
import AdvanceModalWithBtn from "../../components/modal/AdvanceModalWithButton";

const AdminDashboard = () => {
  // Global
  const widthSize = WidthSizeDetection();

  // State
  const [filterName, setFilterName] = useState<string>("");

  // API
  const getUserDetailsQuery = useGetUserDetailsQuery();

  return (
    <div className="bg-[#F0F2F5] min-h-screen ">
      <Nav />
      <SideBar />
      <div className="flex pt-28">
        <div
          className={`flex ${
            widthSize.mediumDevice ? "w-2/12 mr-14" : "w-3/12 mr-5"
          } `}
        ></div>
        <div
          className={`${widthSize.mediumDevice ? "basis-8/12" : "basis-7/12"}`}
        >
          <p className="ml-4 mb-5 text-2xl font-bold">Admin Dashboard</p>{" "}
          <hr className="basis-1/2 pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
          <div>
            <AdvanceModalWithBtn
              modalOpenBtnName="Create user"
              modalTitle="Create user"
              className="bg-white h-10 ml-0 mb-5"
              isCreateUserModal={true}
            />
          </div>
          <input
            placeholder="Search user"
            className="p-2 rounded-lg w-1/3 mb-5"
            onChange={(e) => setFilterName(e.target.value)}
          />
          <div className="relative overflow-x-auto mb-10">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {getUserDetailsQuery?.data?.body
                  ?.filter((user: any) =>
                    user?.firstName
                      .toLowerCase()
                      .includes(filterName.toLowerCase())
                  )
                  ?.filter((user: any) => user?.status === 1)
                  .map((user: any, index: any) => {
                    return (
                      <tr className="bg-white border-b ">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">
                          <ImageContainer
                            className="w-[30px] rounded-full"
                            src={
                              user?.profileImgPath
                                ? user?.profileImgPath
                                : "https://i.ibb.co/S3yrWfn/blob.jpg"
                            }
                          />
                        </td>
                        <td className="px-6 py-4">
                          {user?.firstName} {user?.lastName}{" "}
                        </td>
                        <td className="px-6 py-4">{user?.email}</td>
                        <td className="px-6 py-4">{user?.userType}</td>
                        <td className="px-6 py-4 flex">
                          <AdvanceModalWithBtn
                            modalOpenBtnName="Edit"
                            modalTitle="Edit user"
                            className="bg-white h-5 ml-0 "
                            isUserEditModal={true}
                            userIdPlaceholder={user?.id}
                            fNamePlaceholder={user?.firstName}
                            lNamePlaceholder={user?.lastName}
                            emailPlaceholder={user?.email}
                            bioPlaceholder={user?.userBio}
                            typePlaceholder={user?.userType}
                            profileImgPathPlaceholder={user?.profileImgPath}
                          />
                          <AdvanceModalWithBtn
                            modalOpenBtnName="Delete"
                            modalTitle="Delete user"
                            className="bg-white h-5 ml-0 "
                            isUserDeletModal={true}
                            userIdPlaceholder={user?.id}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

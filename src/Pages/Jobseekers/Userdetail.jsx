import React, {  useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailUser } from "../../Redux/userSlice";
import Loading from "../../Components/Loading";
import DetailComp from "../../Components/DetailComp";

const Userdetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetail, userDetailStatus } = useSelector((state) => state.users);

  useMemo(() => {
    dispatch(getDetailUser(id));
  }, [dispatch, id]);


  return (
    <div>
      {userDetailStatus == "loading" ? (
        <Loading />
      ) : (
        <DetailComp type="user" data={userDetail} />
      )}
    </div>
  );
};

export default Userdetail;

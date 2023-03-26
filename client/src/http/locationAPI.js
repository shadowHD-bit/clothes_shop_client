//location
import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createLocationApi = async (location) => {
  const { data } = await $authHost.post("api/locations/create", location);
  return data;
};

export const fetchLocations = async () => {
  const { data } = await $host.get("api/locations/get-all");
  return data;
};

export const fetchOneLocations = async (id) => {
    const { data } = await $host.get("api/locations/get-one/"+id);
    return data;
  };

export const deleteLocationsApi = async (id) => {
  const { data } = await $host({
    method: "DELETE",
    url: "api/locations/delete/" + id,
  });
  return data;
};

export const updateLocation = async (id, location) => {
  const { data } = await $host({
    method: "PUT",
    url: `api/locations/update/${id}`,
    data: location,
  });
  return data;
};

import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import {
  GetPets,
  GetCharacter,
  GetFur,
  GetRace,
  GetSex,
} from "../../Services/Pet";
import "./styles.scss";
import dog from "../../Assets/img/dog-blue.svg";
import Pet from "../../Components/Pet";
import AddPet from "../../Containers/AddPet";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SubMenu from "../../Components/Menu/SubMenu";

const Pets = (props) => {
  const history = useHistory();

  const [sesion, setSesion] = useState(null);
  const [pets, setPets] = useState(null);
  const [open, setOpen] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [races, setRaces] = useState(null);
  const [furs, setFurs] = useState(null);
  const [sexes, setSexes] = useState(null);
  const [characteres, setCaracteres] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    let localSesion = null;
    try {
      localSesion = JSON.parse(localStorage.getItem("sesion"));
    } catch (error) {
      localStorage.setItem("sesion", null);
    }
    if (localSesion === null) {
      history.push("/");
      return;
    }
    if (localSesion.access_token !== undefined) {
      setFetching(true);
      GetPets(
        localSesion.access_token,
        localSesion.veterinary.id,
        (data) => {
          let auxData = data.map((n) => {
            return { ...n, open: false };
          });
          console.log(auxData);
          setPets(auxData);
          setFetching(false);
        },
        (error) => {
          setFetching(false);
        }
      );

      GetRace(localSesion.access_token, (data) => {
        //console.log('razas', data)
        setRaces(data);
      });

      GetFur(localSesion.access_token, (data) => {
        //console.log('fur', data)
        setFurs(data);
      });

      GetSex(localSesion.access_token, (data) => {
        //console.log('sex', data)
        setSexes(data);
      });

      GetCharacter(localSesion.access_token, (data) => {
        //console.log('char', data)
        setCaracteres(data);
      });

      setSesion(localSesion);
      setOptions(props.match.params.option);
    }
  }, []);

  useEffect(() => {
    if (options == "create") {
      handleAddPet();
    }
  }, [options]);

  const handleAddPet = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const updatePets = (id) => {
    setFetching(true);
    setOpen(false);
    GetPets(
      sesion.access_token,
      sesion.veterinary.id,
      (data) => {
        let auxData = data.map((n) => {
          if (n.id + "" === id) return { ...n, open: true };
          else return { ...n, open: false };
        });
        console.log(auxData);
        setPets(auxData);
        setFetching(false);
      },
      (error) => {
        setFetching(false);
      }
    );
  };

  const UpdatePet = (resp) => {
    let petAux = pets.map((d) => {
      //console.log(d, resp)
      if (d.id + "" === resp.id + "") {
        return { ...d, ...resp };
      }
      return d;
    });
    console.log(petAux);
    setPets(petAux);
  };

  return (
    <div className="pets-wrapper" style={{ width: "100%" }}>
      {pets === null || fetching || sesion === undefined ? (
        <span className="circular-progress">
          <CircularProgress />
        </span>
      ) : (
        <div style={{ width: "100%" }}>
          {pets.map((data) => {
            return (
              <Pet
                key={data.id}
                ownerName={""}
                data={data}
                open={data.open}
                onDelete={updatePets}
                sesion={sesion}
                furs={furs}
                sexes={sexes}
                characteres={characteres}
                races={races}
                onUpdate={UpdatePet}
              >
                <div className="pet-list-item">
                  <span className="dog-img">
                    <img src={dog} alt="dog" style={{ width: "100%" }} />
                  </span>
                  <div className="pet-info">
                    <span className="pet-name">{data.nombre}</span>
                    <div className="pet-owners">
                      {data.propietarios.map((p_data) => {
                        return (
                          <span key={p_data.id} className="owner-name">
                            {p_data.nombre}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Pet>
            );
          })}
        </div>
      )}
      {/* <span className="addpet-btn" onClick={handleAddPet}>
        <AddCircleIcon />
      </span> */}
      <SubMenu addPet={handleAddPet} open={open} />
      <AddPet open={open} onClose={handleClose} updatePets={updatePets} />
    </div>
  );
};
export default Pets;

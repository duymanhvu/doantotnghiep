import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";

import { Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

import { AuthContext } from "../../contexts/AuthContext";

import moment from "moment";

import { toast } from "react-toastify";

import { Link } from "react-router-dom";

import scroll_down from "../../assets/img/ic_scroll_down.svg";
import add_photo from "../../assets/img/ic_add_photo.svg";

import { apiUrl } from "../../contexts/constants";

import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const {
    registerUser,
    editUser,
    getUser,
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      tour_date: new Date("2023-10-20"),
    },
  });

  const [user, setUser] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      getUser()
        .then((result) => {
          setUser(result.userInfor);
        })
        .catch((err) => {
          setUser({});
        });
    }
  }, []);

  const onSubmit = async (data, e) => {
    setLoading(true);

    try {
      let form_data = new FormData(document.getElementById("form"));
      for (var key in data) {
        if (key !== "delegate_photos") {
          form_data.append(key, JSON.stringify(data[key]));
        } else {
          form_data.append(key, data[key]);
        }
      }

      if (!isAuthenticated) {
        const registration = await registerUser(form_data);

        if (registration.status === 1) {
          toast.success(registration.message);
          toast.success(
            "Registration is successful, login information has been sent to your email"
          );
          e.target.reset();
          navigate("/login");
        } else {
          toast.error(registration.message);
          e.target.reset();
        }
      } else {
        const update = await editUser(form_data);

        if (update.status === 1) {
          toast.success(update.message);
          e.target.reset();
          window.scrollTo(0, 0);
        } else {
          toast.error(update.message);
        }
      }
    } catch (error) {
      e.target.reset();
    } finally {
      setLoading(false);
    }
  };

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    setValue("delegate_photos", e.target.files[0]);
  };

  const getOrg = watch("organization");
  const getHotel = watch("registered_hotel");
  const getDietary = watch("dietary_requirements");

  useEffect(() => {
    if (getDietary !== "yes") {
      setValue("dietary_other", "");
    }

    if (getOrg !== "other") {
      setValue("organization_other", "");
    }
  }, [getDietary, getOrg]);

  useEffect(() => {
    if (getHotel !== "other") {
      setValue("hotel_other", null);
    }
  }, [getHotel]);

  useEffect(() => {
    if (user && user !== null && isAuthenticated) {
      if (
        user.delegate_photos ===
        "https://static.thenounproject.com/png/5034901-200.png"
      ) {
        setPreview(user.delegate_photos);
      } else {
        setPreview(
          (window.location.host?.includes("27.72.61.53")
            ? "http://27.72.61.53:8800/acg25/public/"
            : "http://acg25admin.navisoft.com.vn/acg25/public/") +
            user.delegate_photos
        );
      }

      const defaultValues = {
        organization: user.organization,
        organization_other: user.organization_other,
        title: user.title,
        first_name: user.first_name,
        last_name: user.last_name,
        position: user.position,
        division_or_department: user.division_or_department,
        mail_address: user.mail_address,
        email: user.email,
        tel: user.tel,
        fax: user.fax,
        country: user.country,
        delegate_photos: user.avatar,
        //
        spouse_title: user.spouse_title,
        spouse_first_name: user.spouse_first_name,
        spouse_last_name: user.spouse_last_name,
        //
        welcome_dinner: user.welcome_dinner,
        gala_dinner: user.gala_dinner,
        spouse_gala_dinner: user.spouse_gala_dinner,
        farewell_dinner: user.farewell_dinner,
        spouse_farewell_dinner: user.spouse_farewell_dinner,
        dietary_requirements: user.dietary_requirements,
        dietary_other: user.dietary_other,
        // Thiếu trường other dietary
        //
        eoi: user.eoi,
        nbi: user.nbi,
        technical: user.technical,
        rarm: user.rarm,
        is: user.investor_services,
        legal: user.legal,
        //
        // tour_date:
        //   user.tour_date && isAuthenticated
        //     ? moment(user.tour_date, "YYYY-MM-DD HH:mm:ss").utc().toDate()
        //     : user.tour_date,
        // tour_name: user.tour_name,
        half_day_tour: user.half_day_tour,
        tour_for_delegate: user.tour_for_delegate,
        tour_for_spouse: user.tour_for_spouse,
        //
        // arrival_to_hotel: user.arrival_to_hotel,
        // arrival_date:
        //   user.arrival_date && isAuthenticated
        //     ? moment(user.arrival_date, "YYYY-MM-DD HH:mm:ss").utc().toDate()
        //     : user.arrival_date,
        // arrival_time: user.arrival_time,
        // arrival_flight_no: user.arrival_flight_no,
        //
        // depature_from_hotel: user.depature_from_hotel,
        // depature_date:
        //   user.depature_date && isAuthenticated
        //     ? moment(user.depature_date, "YYYY-MM-DD HH:mm:ss").utc().toDate()
        //     : user.depature_date,
        // depature_time: user.depature_time,
        // depature_flight_no: user.depature_flight_no,
        //
        registered_hotel: user.registered_hotel,
        hotel_other: user.hotel_other,
        //
        visa: user.visa,
      };

      Object.keys(defaultValues).forEach((fieldName) => {
        setValue(fieldName, defaultValues[fieldName]);
      });
    } else {
      setPreview("");
      reset();
    }
  }, [user, isAuthenticated]);

  return (
    <div className="registration">
      <div className="registration__container">
        <div className="background">
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">conference</h1>
          </div>

          <div className="scroll">
            <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
              <span>SCROLL DOWN</span>
              <img src={scroll_down} alt="scroll" />
            </div>
          </div>
        </div>

        <div className="registration__form">
          <div className="registration__form-wrap">
            <div className="heading v1 text-center">
              Registration for Conference
            </div>

            {loading ? (
              <>
                <div className="loading">
                  <div className="arc"></div>
                  <div className="arc"></div>
                  <div className="arc"></div>
                </div>
              </>
            ) : (
              <>
                <Form
                  id="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="form"
                >
                  <div className="row">
                    <Form.Text>
                      <i>
                        Please complete all the relevant fields below in order
                        to make registration:
                      </i>
                    </Form.Text>
                    <div className="col-lg-12">
                      <div className="heading v2">Delegate Information</div>
                    </div>
                    <div className="col-lg-12">
                      <Form.Group>
                        <Form.Label className="req">Organization</Form.Label>
                        <Form.Select
                          {...register("organization", { required: true })}
                          className={
                            errors.organization ? "form-control-error" : ""
                          }
                        >
                          <option value=""></option>
                          <option value="Association of Global Custodians">
                            Association of Global Custodians
                          </option>
                          <option value="Australian Securities Exchange">
                            Australian Securities Exchange
                          </option>
                          <option value="Bursa Malaysia Depository Sdn Bhd">
                            Bursa Malaysia Depository Sdn Bhd
                          </option>
                          <option value="Bursa Malaysia Securities Clearing Sdn Bhd">
                            Bursa Malaysia Securities Clearing Sdn Bhd
                          </option>
                          <option value="Central Depository Bangladesh Limited">
                            Central Depository Bangladesh Limited
                          </option>
                          <option value="China Central Depository & Clearing Co., ltd">
                            China Central Depository & Clearing Co., ltd
                          </option>
                          <option value="China Securities Depository and Clearing Corporation Limited">
                            China Securities Depository and Clearing Corporation
                            Limited
                          </option>
                          <option value="Central Depository Services (India) Limited">
                            Central Depository Services (India) Limited
                          </option>
                          <option value="Central Securities Depository of Iran">
                            Central Securities Depository of Iran
                          </option>
                          <option value="Central Securities Depository JSC (Republic of Kazakhstan)">
                            Central Securities Depository JSC (Republic of
                            Kazakhstan)
                          </option>
                          <option value="CDS and Clearing Limited (Nepal)">
                            CDS and Clearing Limited (Nepal)
                          </option>
                          <option value="Central Depository Company of Pakistan Limited">
                            Central Depository Company of Pakistan Limited
                          </option>
                          <option value="Central Depository System (Pvt.) Limited (Sri Lanka)">
                            Central Depository System (Pvt.) Limited (Sri Lanka)
                          </option>
                          <option value="Deutsche Bank AG Singapore">
                            Deutsche Bank AG Singapore
                          </option>
                          <option value="Hong Kong Monetary Authority">
                            Hong Kong Monetary Authority
                          </option>
                          <option value="Hong Kong Securities Clearing Co., Ltd">
                            Hong Kong Securities Clearing Co., Ltd
                          </option>
                          <option value="Indian Clearing Corporation Ltd.">
                            Indian Clearing Corporation Ltd.
                          </option>
                          <option value="Indonesia Clearing and Guarantee Corporation">
                            Indonesia Clearing and Guarantee Corporation
                          </option>
                          <option value="Japan Securities Depository Center, Inc">
                            Japan Securities Depository Center, Inc
                          </option>
                          <option value="Korea Securities Depository">
                            Korea Securities Depository
                          </option>
                          <option value="Multi Commodity Exchange Clearing Corporation Limited (India)">
                            Multi Commodity Exchange Clearing Corporation
                            Limited (India)
                          </option>
                          <option value="Maldives Securities Depository">
                            Maldives Securities Depository
                          </option>
                          <option value="Mongolian Central Securities Depository Co., Ltd. (MCSD)">
                            Mongolian Central Securities Depository Co., Ltd.
                            (MCSD)
                          </option>
                          <option value="Mongolian Securities Clearing Center Co.,Ltd">
                            Mongolian Securities Clearing Center Co.,Ltd
                          </option>
                          <option value="National Securities Clearing Corporation Ltd. (India)">
                            National Securities Clearing Corporation Ltd.
                            (India)
                          </option>
                          <option value="National Securities Depository Limited (India)">
                            National Securities Depository Limited (India)
                          </option>
                          <option value="New Zealand Central Securities Depository">
                            New Zealand Central Securities Depository
                          </option>
                          <option value="National Clearing Company of Pakistan Limited">
                            National Clearing Company of Pakistan Limited
                          </option>
                          <option value="PT. Kustodian Sentral Efek Indonesia">
                            PT. Kustodian Sentral Efek Indonesia
                          </option>
                          <option value="Phillippine Depository & Trust Corp.">
                            Phillippine Depository & Trust Corp.
                          </option>
                          <option value="Royal Securities Exchange of Bhutan Ltd.,">
                            Royal Securities Exchange of Bhutan Ltd.,
                          </option>
                          <option value="SIX SIS Singapore">
                            SIX SIS Singapore
                          </option>
                          <option value="Shanghai Clearing House">
                            Shanghai Clearing House
                          </option>
                          <option value="Singapore Exchange">
                            Singapore Exchange
                          </option>
                          <option value="Taiwan Depository & Clearing Corporation">
                            Taiwan Depository & Clearing Corporation
                          </option>
                          <option value="Thailand Securities Depository Co., Ltd.">
                            Thailand Securities Depository Co., Ltd.
                          </option>
                          <option value="Uzbekistan State Central Securities Depository">
                            Uzbekistan State Central Securities Depository
                          </option>
                          <option value="Vietnam Securities Depository">
                            Vietnam Securities Depository
                          </option>
                          <option value="other">Other</option>
                        </Form.Select>
                        {getOrg !== "other" && (
                          <p className="form-validate">
                            {errors?.organization?.type === "required"
                              ? "Please select an organization"
                              : ""}
                          </p>
                        )}
                      </Form.Group>
                    </div>

                    {getOrg === "other" ? (
                      <>
                        <Form.Text>If Other, please specify</Form.Text>
                        <div className="col-lg-12">
                          <Form.Group className="mb-3">
                            <Form.Label>Organization</Form.Label>
                            <Form.Control
                              type="text"
                              {...register("organization_other", {})}
                            />
                          </Form.Group>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="form-grid form-grid-10-2">
                      <div className="">
                        <div className="row">
                          <div className="col-lg-4">
                            <Form.Group>
                              <Form.Label className="req">Title</Form.Label>
                              <Form.Select
                                {...register("title", { required: true })}
                                className={
                                  errors.title ? "form-control-error" : ""
                                }
                              >
                                <option value=""></option>
                                <option value="Mr.">Mr.</option>
                                <option value="Ms.">Ms.</option>
                              </Form.Select>
                              <p className="form-validate">
                                {errors?.title?.type === "required"
                                  ? "Please select a title"
                                  : ""}
                              </p>
                            </Form.Group>
                          </div>
                          <div className="col-lg-4">
                            <Form.Group>
                              <Form.Label className="req">
                                First Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                {...register("first_name", {
                                  required: true,
                                })}
                                className={
                                  errors.first_name ? "form-control-error" : ""
                                }
                              />
                              <p className="form-validate">
                                {errors?.first_name?.type === "required"
                                  ? "Please enter first name"
                                  : ""}
                              </p>
                            </Form.Group>
                          </div>
                          <div className="col-lg-4">
                            <Form.Group>
                              <Form.Label className="req">Last Name</Form.Label>
                              <Form.Control
                                type="text"
                                {...register("last_name", {
                                  required: true,
                                })}
                                className={
                                  errors.last_name ? "form-control-error" : ""
                                }
                              />
                              <p className="form-validate">
                                {errors?.last_name?.type === "required"
                                  ? "Please enter last name"
                                  : ""}
                              </p>
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <Form.Group>
                              <Form.Label className="req">Position</Form.Label>
                              <Form.Control
                                type="text"
                                {...register("position", {
                                  required: true,
                                })}
                                className={
                                  errors.position ? "form-control-error" : ""
                                }
                              />
                              <p className="form-validate">
                                {errors?.position?.type === "required"
                                  ? "Please enter position"
                                  : ""}
                              </p>
                            </Form.Group>
                          </div>

                          <div className="col-lg-4">
                            <Form.Group>
                              <Form.Label className="req">
                                Division/Department
                              </Form.Label>
                              <Form.Control
                                type="text"
                                {...register("division_or_department", {
                                  required: true,
                                })}
                                className={
                                  errors.division_or_department
                                    ? "form-control-error"
                                    : ""
                                }
                              />
                              <p className="form-validate">
                                {errors?.division_or_department?.type ===
                                "required"
                                  ? "Please enter division or department"
                                  : ""}
                              </p>
                            </Form.Group>
                          </div>

                          <div className="col-lg-4">
                            <Form.Group>
                              <Form.Label className="req">
                                Mail Address
                              </Form.Label>
                              <Form.Control
                                type="text"
                                {...register("mail_address", {
                                  required: "Please enter your mail address",
                                })}
                                className={
                                  errors.mail_address
                                    ? "form-control-error"
                                    : ""
                                }
                              />
                              <p className="form-validate">
                                {errors.mail_address
                                  ? `${errors.mail_address.message}`
                                  : ""}
                              </p>
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row p-0">
                          <div className="col-lg-4">
                            <Form.Group>
                              <Form.Label className="req">Email</Form.Label>
                              <Form.Control
                                type="email"
                                {...register("email", {
                                  pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                                    message: "Không đúng định dạng của email",
                                  },
                                  required: "Please enter your email",
                                })}
                                className={
                                  errors.email ? "form-control-error" : ""
                                }
                              />
                              <p className="form-validate">
                                {errors.email ? `${errors.email.message}` : ""}
                              </p>
                            </Form.Group>
                          </div>
                          <div className="col-lg-4">
                            <Form.Group>
                              <Form.Label className="req">Tel</Form.Label>
                              <Form.Control
                                type="text"
                                {...register("tel", {
                                  required: true,
                                })}
                                className={
                                  errors.tel ? "form-control-error" : ""
                                }
                              />
                              <p className="form-validate">
                                {errors?.tel?.type === "required"
                                  ? "Please enter tel"
                                  : ""}
                              </p>
                            </Form.Group>
                          </div>
                          <div className="col-lg-4">
                            <Form.Group>
                              <Form.Label className="req">Fax</Form.Label>
                              <Form.Control
                                type="text"
                                {...register("fax", {
                                  required: true,
                                })}
                                className={
                                  errors.fax ? "form-control-error" : ""
                                }
                              />
                              <p className="form-validate">
                                {errors?.fax?.type === "required"
                                  ? "Please enter fax"
                                  : ""}
                              </p>
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <Form.Group>
                              <Form.Label className="req">Country</Form.Label>
                              <Form.Control
                                type="text"
                                {...register("country", {
                                  required: true,
                                })}
                                className={
                                  errors.country ? "form-control-error" : ""
                                }
                              />
                              {errors?.country?.type === "required" && (
                                <p className="form-validate">
                                  Please enter country
                                </p>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                      </div>

                      <div className="">
                        <div className="form-upload">
                          <Form.Group className="form-upload-control">
                            <label className="form-upload-label">
                              <div className="control">
                                <img src={add_photo} alt="avatar" />
                                <span className="title">
                                  Upload your recent photo
                                </span>
                              </div>
                              <input type="file" onChange={onSelectFile} />
                              {(selectedFile || preview) && (
                                <img
                                  className="preview"
                                  src={preview}
                                  alt="product"
                                  style={
                                    selectedFile
                                      ? { zIndex: "2" }
                                      : { zIndex: "2" }
                                  }
                                />
                              )}
                              <div className="overlay"></div>
                            </label>
                            <span className="accept">
                              Allowed *.jpeg, *.jpg, *.png, *.gif Max size of
                              3.0 MB
                            </span>
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="heading v2">
                        Accompanying spouse (if any)
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <Form.Group className="mb-4">
                        <Form.Label>Title</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          {...register("spouse_title", {})}
                        >
                          <option value=""></option>
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-lg-4">
                      <Form.Group className="mb-4">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          {...register("spouse_first_name", {})}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-lg-4">
                      <Form.Group className="mb-4">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          {...register("spouse_last_name", {})}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="heading v2">Dinner Attendance</div>
                    </div>

                    <Form.Text className="v1">
                      Please indicate dinner you will attend by ticking the
                      box(es) below.
                    </Form.Text>

                    <div className="col-xl-4 col-lg-6 col-md-6">
                      <div className="form-list mb-4">
                        <Form.Check
                          type="checkbox"
                          label="Welcome dinner"
                          {...register("welcome_dinner", {})}
                        />

                        <ul>
                          <li>17th Oct</li>
                          <li>18:00 – 20:30</li>
                          <li>Delegates only</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6">
                      <div className="form-list">
                        <Form.Check
                          type="checkbox"
                          label="Gala dinner"
                          {...register("gala_dinner", {})}
                        />

                        <ul>
                          <li>18th Oct</li>
                          <li>18:30 – 21:00</li>
                          <Form.Check
                            type="checkbox"
                            label="Accompanying Spouse"
                            {...register("spouse_gala_dinner", {})}
                          />
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6">
                      <div className="form-list">
                        <Form.Check
                          type="checkbox"
                          label="Farewell party"
                          {...register("farewell_dinner", {})}
                        />

                        <ul>
                          <li>19th Oct</li>
                          <li>16:30 – 22:00</li>
                          <Form.Check
                            type="checkbox"
                            label="Accompanying Spouse"
                            {...register("spouse_farewell_dinner", {})}
                          />
                        </ul>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <Form.Group>
                        <Form.Label className="v1">
                          Dietary requirements:
                        </Form.Label>
                        <div className="form-check-label v1">
                          <Form.Check
                            type="radio"
                            label="Yes"
                            value="yes"
                            {...register("dietary_requirements", {})}
                          />

                          <Form.Check
                            type="radio"
                            label="No"
                            value="no"
                            {...register("dietary_requirements", {})}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    {getDietary === "yes" && (
                      <>
                        <Form.Text>If yes, please specify:</Form.Text>
                        <div className="col-lg-12">
                          <Form.Group>
                            <Form.Control
                              type="text"
                              {...register("dietary_other", {})}
                            />
                          </Form.Group>
                        </div>
                      </>
                    )}

                    <Form.Text className="v2">
                      <i>
                        *Note: Delegates who are not from ACG members will not
                        attend the 2nd meeting day (19/10) but are welcome to
                        dinners and Tour
                      </i>
                    </Form.Text>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="heading v2">Task Force Group Meeting</div>
                    </div>

                    <Form.Text className="v1">
                      Please indicate TF meeting(s) you will attend by ticking
                      the box(es) below.
                    </Form.Text>

                    <div className="col-xl-4 col-lg-6 col-md-6">
                      <div className="form-meet mb-4">
                        <div className="title">
                          TF Meeting I (08:30 - 09:30)
                        </div>
                        <Form.Check
                          type="checkbox"
                          label="Exchange of Information Task Force"
                          {...register("eoi", {})}
                        />
                        <Form.Check
                          type="checkbox"
                          label="New Business Initiative Task Force"
                          {...register("nbi", {})}
                        />
                        <Form.Check
                          type="checkbox"
                          label="Technical Task Force"
                          {...register("technical", {})}
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6">
                      <div className="form-meet">
                        <div className="title">
                          TF Meeting II (09:45 - 10:45)
                        </div>
                        <Form.Check
                          type="checkbox"
                          label="Legal Task Force"
                          {...register("legal", {})}
                        />
                        <Form.Check
                          type="checkbox"
                          label="Risk and Recovery Management Task Force"
                          {...register("rarm", {})}
                        />
                        <Form.Check
                          type="checkbox"
                          label="Investor Services Task Force"
                          {...register("is", {})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="heading v2">Optional Tours</div>
                    </div>

                    <div className="col-lg-12">
                      <Form.Group>
                        <Form.Label>
                          A half day tour will be organized on 18th October 2023
                          for accompanying spouses, please indicate if your
                          spouse would like to join:
                        </Form.Label>
                        <div className="form-check-label v1">
                          <Form.Check
                            type="radio"
                            label="Yes"
                            value="yes"
                            {...register("half_day_tour", {})}
                          />

                          <Form.Check
                            type="radio"
                            label="No"
                            value="no"
                            {...register("half_day_tour", {})}
                          />
                        </div>

                        <Form.Label>
                          Please indicate if you would like to join Hoi An tour
                          on 20th October 2023 by checking the box:
                        </Form.Label>
                      </Form.Group>
                      <Form.Group
                        className="form-check-label v1 mb-0"
                        style={{ gap: "115px" }}
                      >
                        <Form.Check
                          type="checkbox"
                          label="Delegate"
                          {...register("tour_for_delegate", {})}
                        />
                        <Form.Check
                          type="checkbox"
                          label="Spouse"
                          {...register("tour_for_spouse", {})}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="heading v2">Hotel Information</div>
                    </div>

                    <div className="col-lg-8">
                      <Form.Group>
                        <Form.Label className="mb-3">
                          Which hotel will you stay? 󠆯
                        </Form.Label>
                        {/* <Form.Select
                          {...register("registered_hotel", { required: true })}
                          className={
                            errors.registered_hotel ? "form-control-error" : ""
                          }
                        >
                          <option value=""></option>
                          <option value="Furama Resort Danang">
                            Furama Resort Danang
                          </option>
                          <option value="other">Other</option>
                        </Form.Select> */}
                        <Form.Check
                          type="radio"
                          label="Furama Resort Danang"
                          value="Furama Resort Danang"
                          {...register("registered_hotel", {})}
                        />
                        <Form.Check
                          type="radio"
                          label="Other"
                          value="other"
                          {...register("registered_hotel", {})}
                        />
                      </Form.Group>
                    </div>

                    {getHotel === "other" ? (
                      <>
                        <div className="col-lg-9">
                          <Form.Group className="mt-4">
                            <Form.Label>If other, please specify:</Form.Label>
                            <Form.Control
                              type="text"
                              {...register("hotel_other", {})}
                            />
                          </Form.Group>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="heading v2">Visa</div>
                    </div>

                    <div className="title v1">Do you need visa support ?</div>

                    <div className="form-check-label v1">
                      <Form.Check
                        type="radio"
                        label="Yes"
                        value="Yes"
                        {...register("visa", {})}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        value="No"
                        {...register("visa", {})}
                      />
                    </div>
                  </div>

                  <Form.Group>
                    <button className="btn m-auto" type="submit">
                      {isAuthenticated ? "Save" : "Submit"}
                    </button>
                  </Form.Group>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

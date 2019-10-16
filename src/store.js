import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  users: [
    {
      userID: "UF0001",
      userType: "officer",
      username: "john",
      password: "john123123",
      fullname: "John Smith"
    },
    {
      userID: "UA0002",
      userType: "applicant",
      username: "tom",
      password: "tom123123",
      fullname: "Tom Smith",
      email: "tom@gmail.com",
      monthlyIncome: 3000
    },
    {
      userID: "UA0003",
      userType: "applicant",
      username: "susan",
      password: "susan123123",
      fullname: "Susan Smith",
      email: "susan@gmail.com",
      monthlyIncome: 3200
    },
    {
      userID: "UA0004",
      userType: "applicant",
      username: "nancy",
      password: "nancy123123",
      fullname: "Nancy Smith",
      email: "nancy@gmail.com",
      monthlyIncome: 3150
    }
  ],
  loggedInUser: {},
  auth: false,
  residences: [
    {
      residenceID: "R0001",
      name: "Permai Apartment",
      address: "204-12-03, Jalan Kampung Bandar Dalam, 51100 Kuala Lumpur",
      state: "Kuala Lumpur"
    },
    {
      residenceID: "R0002",
      name: "Fraser Residence",
      address:
        "Jalan Permas Selatan, Bandar Baru Permas Jaya, 81750 Masai, Johor",
      state: "Johor"
    },
    {
      residenceID: "R0003",
      name: "Lakeville Apartment",
      address:
        "13-3 Pangsapuri, Jalan Kampung Tiong, Kampung Tiong, 20100 Kuala Terengganu",
      state: "Terengganu"
    }
  ],
  selectedResidence: {},
  units: [
    {
      unitID: "U0001",
      size: "400",
      monthlyRental: "700",
      availability: "Yes",
      residenceID: "R0001"
    },
    {
      unitID: "U0002",
      size: "430",
      monthlyRental: "735",
      availability: "Yes",
      residenceID: "R0001"
    },
    {
      unitID: "U0003",
      size: "450",
      monthlyRental: "750",
      availability: "Yes",
      residenceID: "R0001"
    },
    {
      unitID: "U0004",
      size: "350",
      monthlyRental: "600",
      availability: "Yes",
      residenceID: "R0002"
    },
    {
      unitID: "U0005",
      size: "450",
      monthlyRental: "800",
      availability: "Yes",
      residenceID: "R0002"
    },
    {
      unitID: "U0006",
      size: "450",
      monthlyRental: "800",
      availability: "Yes",
      residenceID: "R0002"
    },
    {
      unitID: "U0007",
      size: "500",
      monthlyRental: "850",
      availability: "Yes",
      residenceID: "R0003"
    },
    {
      unitID: "U0008",
      size: "500",
      monthlyRental: "850",
      availability: "Yes",
      residenceID: "R0003"
    },
    {
      unitID: "U0007",
      size: "600",
      monthlyRental: "950",
      availability: "Yes",
      residenceID: "R0003"
    }
  ],
  residenceUnits: [],
  selectedUnit: {},
  applications: [
    {
      applicationID: "A0001",
      applicationDate: "23-02-19",
      startMonth: "4",
      startYear: "2019",
      duration: "6",
      status: "Pending",
      unitID: "U0001",
      userID: "UA0002"
    },
    {
      applicationID: "A0002",
      applicationDate: "25-03-19",
      startMonth: "4",
      startYear: "2019",
      duration: "12",
      status: "Rejected",
      unitID: "U0001",
      userID: "UA0004"
    },
    {
      applicationID: "A0003",
      applicationDate: "29-03-19",
      startMonth: "5",
      startYear: "2019",
      duration: "12",
      status: "Pending",
      unitID: "U0001",
      userID: "UA0003"
    },
    {
      applicationID: "A0004",
      applicationDate: "12-01-19",
      startMonth: "4",
      startYear: "2019",
      duration: "12",
      status: "Rejected",
      unitID: "U0002",
      userID: "UA0004"
    },
    {
      applicationID: "A0005",
      applicationDate: "09-05-19",
      startMonth: "6",
      startYear: "2019",
      duration: "6",
      status: "Pending",
      unitID: "U0002",
      userID: "UA0002"
    },
    {
      applicationID: "A0006",
      applicationDate: "14-05-19",
      startMonth: "7",
      startYear: "2019",
      duration: "12",
      status: "Pending",
      unitID: "U0003",
      userID: "UA0002"
    },
    {
      applicationID: "A0007",
      applicationDate: "23-05-19",
      startMonth: "7",
      startYear: "2019",
      duration: "6",
      status: "Pending",
      unitID: "U0003",
      userID: "UA0003"
    }
  ],
  unitApplications: [],
  selectedApplication: {}
};

const getters = {
  getUsers: state => state.users,
  getLoggedInUser: state => state.loggedInUser,
  getAuth: state => state.auth,
  getResidences: state => state.residences,
  getSelectedResidence: state => state.selectedResidence,
  getUnits: state => state.units,
  getResidenceUnits: state => state.residenceUnits,
  getSelectedUnit: state => state.selectedUnit,
  getApplications: state => state.applications,
  getUnitApplications: state => state.unitApplications,
  getSelectedApplication: state => state.selectedApplication
};

const mutations = {
  setUsers: (state, users) => {
    state.users = users;
  },
  addNewUser: (state, newUser) => {
    state.users.push(newUser);
  },
  setLoggedInUser: (state, user) => {
    state.loggedInUser = user;
  },
  setAuth: (state, auth) => {
    state.auth = auth;
  },
  setResidences: (state, residences) => {
    state.residences = residences;
  },
  addResidence: (state, residence) => {
    state.residences.push(residence);
  },
  setSelectedResidence: (state, residence) => {
    state.selectedResidence = residence;
  },
  setUnits: (state, units) => {
    state.units = units;
  },
  addUnit: (state, unit) => {
    state.units.push(unit);
  },
  setResidenceUnits: (state, units) => {
    state.residenceUnits = units;
  },
  setSelectedUnit: (state, unit) => {
    state.selectedUnit = unit;
  },
  setApplications: (state, applications) => {
    state.applications = applications;
  },
  setUnitApplications: (state, applications) => {
    state.unitApplications = applications;
  },
  setSelectedApplication: (state, application) => {
    state.selectedApplication = application;
  }
};

const actions = {
  fetchUsers: ({ commit }) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    commit("setUsers", users);
  },
  fetchResidences: ({ commit }) => {
    let residences = JSON.parse(localStorage.getItem("residences")) || [];
    commit("setResidences", residences);
  }
};

export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

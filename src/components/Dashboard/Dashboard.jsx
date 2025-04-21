import HomePage from "../HomePage/HomePage";

const Dashboard = ({ user }) => {
  return (
    <>
      <section className="homeSection">
        {/* <h1 className="welcome-user">Welcome, {user.username}</h1> */}
        <HomePage />
      </section>
      
    </>
  );
};

export default Dashboard;
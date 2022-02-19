import { useState, useRef, useCallback } from "react";
import { Spin, Button, Layout } from "antd";
import Card from "components/Card";
import auth from "../../app/auth";
import { useUserList } from "./hooks";
import "./index.less";

const { Content } = Layout;

const Home = (props) => {
  const [pageNum, setPageNum] = useState(1);
  const { userData, totalCountisMore, isLoading } = useUserList(pageNum);

  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return false;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((node) => {
        if (node[0].isIntersecting && totalCountisMore) {
          setPageNum((prevPageNum) => {
            return prevPageNum + 1;
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, totalCountisMore]
  );

  const displayCardData = () => {
    return (
      <>
        {userData.map(({ avatar_url, id, login }, index) => {
          const cardProps = {
            avatar_url,
            id,
            login,
            index,
          };
          if (userData.length === index + 1) {
            return (
              <div key={index} ref={lastElementRef}>
                <Card {...cardProps} />
              </div>
            );
          }
          return (
            <div key={index}>
              <Card {...cardProps} />
            </div>
          );
        })}
      </>
    );
  };

  const logout = () => {
    auth.login(() => {
      localStorage.clear();
      props.history.push("/");
    });
  };
  return (
    <Layout className="container">
      <header>
        <Button className="logout-btn" onClick={logout}>
          Logout
        </Button>
      </header>
      <Content id="listPage">
        {displayCardData()}
        <div>{isLoading && <Spin size="large" />}</div>
      </Content>
    </Layout>
  );
};

export default Home;

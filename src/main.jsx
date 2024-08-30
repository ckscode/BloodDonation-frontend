import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider } from "antd";

import { Provider } from "react-redux";
import store from "./Redux/store.jsx";



createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#961414",
        },
      }}
    >    
      <App />   
    </ConfigProvider>

  </Provider>
);

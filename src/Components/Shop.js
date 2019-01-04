import React from "react";
import axios from "axios";
import Styles from "./Nav.module.css";
import Carousel from "../Shared/Carousel";
import { Route, NavLink, withRouter } from "react-router-dom";

function Shop(props) {
  const [color, colorToggle] = React.useState(false);
  const [color1, colorToggle1] = React.useState(false);
  const [color2, colorToggle2] = React.useState(false);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    axios.get("/api/items").then(response => {
      let items = response.data;
      for (let i = 0; i < items.length; i++) {
        setItems(items);
      }
    });
  }

  function ShopMen() {
    props.history.push("/shop/men");
  }

  function ShopWomen() {
    props.history.push("/shop/women");
  }

  function ShopChildren() {
    props.history.push("/shop/children");
  }
  return (
    <React.Fragment>
      <div className="row" style={{ marginRight: "0px", marginLeft: "0px" }}>
        <div
          onClick={() => ShopMen()}
          onMouseEnter={() => colorToggle(!color)}
          onMouseLeave={() => colorToggle(!color)}
          className="col xs-4"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            height: "33vw",
            width: "100%",
            backgroundImage:
              "url(" +
              " data:image/jpeg;base64,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" +
              ")"
          }}
        >
          <div>
            <h1 className={Styles.whiteText}>Men</h1>
          </div>
          {color && (
            <div onClick={() => ShopMen()} className={Styles.colorToggle} />
          )}
        </div>

        <div
          onClick={() => ShopWomen()}
          onMouseEnter={() => colorToggle1(!color1)}
          onMouseLeave={() => colorToggle1(!color1)}
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            height: "33vw",
            backgroundImage:
              "url(" +
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBgYFxgYGBcVGBcXFxcXFxYXGBcYHSggGBslHhcXITEiJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGhAQGi0dHR8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS03LTc3LS03LTctN//AABEIAP4AxwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAAIHAQj/xABDEAABAwIEAwUFBAgGAQUBAAABAgMRAAQFEiExBkFRImFxgZETMkKhsQfB0fAUI1JicpKi4TNTgrLC8XMVJENj0hf/xAAaAQADAQEBAQAAAAAAAAAAAAABAgMABAUG/8QAJhEAAgICAgEEAQUAAAAAAAAAAAECESExAxJBBBNRYSIUI1Jxsf/aAAwDAQACEQMRAD8Abbq0MgASOfdVV67DYgK+VWbniZqABJPhA1oM88knMqOtebKN4My2zfOJhZMRyNb3F/cXByIUQOeWUjzPPwoM/fhxWUEfjThgLQSjQUqg4oABGGLQd5qO8v0gZQDtV3iHECgmRrSXe3KlHr3VuNWrYGytiN0pxYSAQNppjtMBytKKZzFMTMT18KoYDhvtF66Rvzp2vEhllUE6JMctY5TpVHL4LcEpLki1uzn9k6hgSvKFkEBSpkJ0IEgbneOQq4i/UpOZKigczAbKp/ZCySr88zQ1NzmczrOgQCAogmTH4Rtua2u7ntJJKTlHtMpbzKH7JzcuQros+s0rCBu1lRSlOYJ1JzBOZe4J0+lSpvXt4BH8adOnvJ/M0HTflIyICVO7rJMBJOp0MzvEVXTeKcUEwpTxMAROaNwkCNPnrvsaNsEpxW2HlXzitS4EgCVdkFQiT2ShXdzHrQXiLCdnW0kI2WDuFH4gP2TI/MVVev3yTKMvwrCtNdtRuPWrWH360nt9ADz25kEdDHhFNk4Oefp/UL2+2fDKqrdIRpvVDOU91Md6y3otOykg+Hd5fhQHEWypUgEDv50qSZ4E4uEnGW0SWd1yBqdZKdZqgxbka1j11OlK0KGmFgpmdYqqh4FW9C0vnYGthPKmo1BO6f07qpJXNaAk6VIbRY5VjECtDXqHYrV2QYIrQpNYOiQqzGvajTpWVgDeHUg6n1rd1Je7KdNNTUdhhZcVBPjUt0y5bHsqCh3iagnWwFZq1LTglU9OVdG4ffUWpUmOlcp/Syp4KcMifCBT7dcVMs24CViY0SNVHwrTTawFAbix9S1neB0oFbLy6qBozgD4uFyvQakis4rYSClKNyNY5ChxRcVkDXksYI9BlOvcKMXwU6ghWbURrSzw7eNMH9YY13prRizTvuq03qqjewxk4tSXg55euKaltJQlSSDm+KCSAR3xpNDlkhJK3CrMYJE6J3179p7hRviIJ/SFr3GTnAAkpAHhrM0qXrygdDJJIEGQqdvTWmR9N7v7SnL4LDz+Y5UhKiDIUBCvFRHPX/quufZ/woLZAec7TywNT8I/ZFcvwK0CVpB1JW2Cf9QJHyrtL18pCAfattJHxLg6+ZAFF4weVzc8uXejTiThdq6ExkcjRadD4K5KHjXKuIMKetVBLw7OyHRt4E8j3Gun4fjZcUQl5p7LGbKFJUmdpHrUnFlulxlSHJ9mUkqCRKyAJ0/ZjrQvJCqOW2RU8kJiVJnYiFDTVJ2jTarybDPoaCYSkIv0pYz+y55xlVkKSTI568+dNFy+G1b6Gs3Wjn5/ylZEjC50PnS5xHhgQRG56UzN4nmNAcZuRmOY0UyMbTA9tly/XrNbpUAKjbt8xkVWvEKBim2UJv0mFCKM2V4FSIOu9LtsyZ2pjs7WIoNIDdFW+jMNK0kHlRW7shvQ5xEGlBZEi1KjpWUQtHI5VlA1jLhrnswVyJ5g61WzruFGIGseVEMMtEurObZPIdTVd66Sy+UAaff0rilOVWkPQNe4XUVEyY/O1SucKBCCVGTv4CmFzE4E0MvcXKxGwNdPHyNxEshwvDnd2wdNzXtywpElczzJ1pn4bxdpLMKISRMjr+NUsSyugr5cusUevk1HPsXSpUwDFXuGElKSFK35Grt24jmKppfQCIgn6U93o1EeNJlCyBJnWfXbnsaXMFtvaPTySR9ZOvPanW7syoDJBkwQeYqDD8IDUgQYOWepA+sqif3aMcHdH1Dnwrj+P8B7ZyPNj4ipK4/1V1t3h+3fUh0oBWIIO8eR0FcmW3N6I2QQnxjeuuYRcQkVm8mUcFpnC2m1qdCB7Reil/Erbc+Q9KvusBQEiap3a1KAKIJHI7H0rawL2X9aUz+6CB5Akx60LFrAi/aLhiGn7Z5sBCyl1BgATACkkjuM+tJj7ilCSok02/aFiPtL1lgf/G2pSvFZEfJJ9aUb9GUkVm7ZDlWUUWX1A6GvLhrPqalGWpVJAFMiLNMHQRoRpV6/tUkbCqjF2kbVM8/W8gts9tbIaaa1avbZxKQSI7q2wS8SFhStQKI45jTbqMiCCeZ+6sxkLirsxqamYYzCaCupVng0UZvsqcorVRghhKQtZSeXWsoU28tKsyd69oUbA+YNanXKdDvrBoXxYlDRSRvP5NNKGg0jMRrG9J3EifbSZrk6tS+gp4IHcSSpIEyajVdpy8qo4fh5NWXsOjlrVYunQtlqxuhGlYrHD/hx5z91a2VkNTtVS8t8q8x2qrd6MeYukkCNzV/hfAAtSc535VSvip9aUtCTrJ2SlPVSvhFEbW8DYDSXAkfG6RqRzS2OQ5DmeZG1PCLasP0Hsfu7S3/VoOZ4DRCZIHIFatk+G/dQ5sAFAJ2TJ7zMz/TQS/vEFwKGiU/CBHxfEd1K5knmas3Nz2lDnCv9poSo6uOPUE29zDiVHcneum4JfJUkQa5ayJcT4T6mmzCQU+6YqUiyY53lgtZzIdcT3JVA+mlT21r7Ftbji15UAqOZZIgCT06UvucUFhMrSVAfsxPzNJvFf2mqumV2zLRQlei1rIJyzqlIT16nang21RpTaVEOG3/6RcuvqEl1R0JygJyHIkq+ECEie6avu4QXUhxklciS2cucDqhQ7LifDXuNLmDkxlToNjG5j3teXSaKWtw8HhlBSgACRokEEkZe/Ubec1SKSVM5+SPbJSftwJI3HLaI3BHI1XKpEU43WH/poC0lKXo3iEuDkD0PKaVU25C4KSCDCgeR2IPpSuNHPJUaM2h3irWURBoy0UACaoXdy3MaUBUDFvhMxWuGqUpRgaTzFX22EKqzbIDeoFbwGwffNgHXflVJxuNaJX8K1FDn3tI60yWA7MYu9ayr9rYjLJrKJsHXbrBwpOgPrSvdYUQuD7vI0xIxgiAQSflRAWqVpk7muWLsZiyxaISOVA8aKJ7IpkxrDISSNKWnbMEdqdKKVbJ0ChiQGgqhfXZVyj5zRO5tkDXnVGyQC+2Btmn0BP1AqkEmx1gsY863bIQwVlKyEkkQQpaxJKxuQPdAO0zQNhBUtSVKUVJVBMkDadOe3oK6Ii5SoArCCvKBMJUYA01I8R51z/EmVpulQNZKlAHRSFkQoeGvpXXOIeORaU+ylIRG+5AAOg1IHWeteG8zSpKgvQciCSORSdRNVHFthtKAQeeY76nnUP8A6c62VZe1oCkgyCneBruOk1GSOmLoJpbGdKk6ggQe46g/WmvD07UgWeJ5feBAnboecdOtPnDNyHm1EfCYJ8fvqLTKYeSDiMfq1eFcsByuT0UD6a10/jB5KGjJ1Og/GaQHmElBygSfE/n0qkME5onssTCEwBI1Vrz3PLv5UVtcUkFSipSohI6T05CgKWCleRUJKOwfEHXXry8qduGuGXHiCeynrGp8BT0llidnpDBwdZOOJBgpTMSDr1gH5k8p8KIcTcKOAu3KAlQ95SBmzaABREjXaYFM2EYalpKQn4RH576KhcGlcr/oWULOEuKlBV12oYxbgmSacftCwdNs8FtpytOyYHupcB7QHSd48aSPaSTFLol1DCXUJFaXF8kiBQoyd6tWtjn56UQJEVrcFSoJ0mvcQI0j5VZXahsSCO+aH3Tup5URj1d+sJgetZVFxyRWUTUju9q2mNYnvqk/iakqKUHMOnfQDEcTK1Qkc+v3US4fWJAO5rjaxgZUXHsQKkkEGTS9iTajJT6U33+FqUmY9KV79JROair8iNCi+FE7mmHhfCA642BuTJP7IEFR8dPnQ9tkEq+VOX2e20Jce7/Zp8gFLPzSPWrJG8g3iLhl1pWZiVpMmD7yT3df7UicQNq+MKStI0kQa7jdO0FxXCG3UwoBRO5ifIdBqar7r1squNbODNuiB3fkj1opYlRZIMDtbazrzB6UzYlwEU6sryjfKoZh5GqSOH1JGUjvJ3JJ+7upHNFUmAlNqEJgkq0HOZ6eO1dV4Vwk2tslDmijK1jeM3LxA0NKLOAOaKBB7iNvA0Wsru7Y37bY5KMwOcn4f4hp1SN6HZMOizxHgLTqQR2OZywAR3ilnCcBLrmZonK3qFESCvTLA2JGivNNMOOYgp1CUsj31eyWlRIU0o6e6NzMc41mmjCcLQ0gISJAgeJG58zJrPBm0xRwrhBKXU5lFYEqUSAM3SQepk+XfXQbBAToK2tLJKSTzJnXwq6WQR9D0oZexcLRK0qvVK1Hn91V0GNDoRUyFZtoNEAL4twoXVq41HbylbXUOIBKY8dQfGuHMt619FoTG2p61x/iHh8punWwMsn2iP4Vyfkcw8qKyTmvIvhtNWm1ECBVhPDbx8K3dwZbcEmmUWTYLfYUrVW9Dn7aN6a0ZYg0LvGJMelawpi6lqTXlMZ4dWRI0rKITqLfDzRBOTtHmK8wuyS2rQRrrNS21+EEhR0qpimNN8j57VxuXlG8DikpilLirD82oFDU8UxsfmKqXfEJc6k+OlP2szqgBjLZaEjSfnT7wU0oWDUxK86+cQtRie+AKRcUX7chB3j5naunWjAZabaGyEJT6AVSOjQ2RXMjcR9K2QZH535/nurdy6AmfpPyoXb3KVKUCooTuNASdgegTyPPegXRO+U0PU2gnQE+Amj7WHNDWCo9VGfltUymhEAAeGlbqzWA2rZMbVKcPSrcemn/AH51fcZI217q0SFD4T8vvNCg2ISmW2MStwViMyUqB30Cg3/ERKepgCugsNBIgCkrifCouWHSRlVcN6EaokAEgg9BGtPaNSfE7QedUlpCLbN01KmtA13mvQf70EEkU5AmATyoZb4whaiCIIMEHkfKrjzvL8+tc1wXGfaPOk6KK1mACNiRoPKlkwpWdSbKTtPlS3xdaFXsrpvX2WZLn/jUQSSP3VJHko1JhN2syHEwnSNdTHXuo6XErSUKAKVAgp5EHcU0ZCyiJruNtITOlKeM8RBchEVJxNwlcIuVNsNuOtKhTcAqgK3QT1SZAnlE1JYfZvfuRKENjqtQkeSZNVVs56Fu2dXO5iiTCxpzp3sPsrUP8W6Hg23/AMlKP0pjw/gCzb1IW4eq1H6CBQ6NmSE60vU5Y+tZXT7bCmWxCGkDwSK9qlDHN0qzplRNLGNjUpnSrF/crSnsKA7utLyyvNmVrXHHiA3ZKxbHkJFW/aqSQmAKlssSQBrFV7+4StaQkHcSaHVpgGXCrAFSSCM6lJA8SYpxvvaAkgZh+yNFD8aWMGsvZvskEq7ZJ1jRKFGPWD5U03D4Akfny600VgtBAp+6SrSdeY2I8qC3d4EKQpSgEpUmSdgmRmnyq1iN2FGSkE7A8xSlxE4VNrQndQI128aTyX0jqlnchSQUyQdZIiZ51bCqV+HLxx1hsoRMJSJUqAOyPOjqSpOionumPnVUybLWasiofaVuldZmFnj05WkL/ZdaVPiSPqRTMF6nxn11pf47amze30RmHihaV/8AE0Rw54KabXPvNtn1SKL0byFAusXrzg9Ynwqu05POppoBNHLYEdpRVGw2H41yi0T7C4cQditRSfFRnzH311Z9wZF8uyr/AGmhXFOApetW3WwlLrcmNBnSfeHerQEefWt1vRrpgyyfjWaP4fclQnSNtto7+dI9i+DAOg6Dr0plsrmBHKppjtDVaXQSQNdfzNXlX7YMZpPQAk+gBpesHge0dOlW8abdWyQw5kcGqZUQlXcspBMeFdPHLwyE0Fv02fdbWfEZB/XFUrnHm0GFOMIPRTqSr+UamuJ8YPYpbyq5SQ2FZQ6AVoJ5EFaiRPeBSscTunNAt0j93sD+jLVsEz6EueLWke86f9LRQP53SAayvnb/ANNdUcxQJ6qIJ9TNZWtGDDl4pKzMmK2fvsw2oal2dTua3QuuZAZMhE1ewp4IWc2kjQnlUTFutWwNaXluUjWmoCHHgy8W9iGfMS2004QPhJIDYJHis+lHsexEpIyIKh8URM8iOR/PSlL7OrZxZfyOBsBCASdUklZIlO6zAVAkbzyo1f3YaJ9pOXbOlKsvmDqk+o76lP4OjiWAPiGKLTqWyB46jyoat8KMzvtW+K3qXZGbQgiEpJMHqSPuoYnspSQrMI36mSDI5HT6UsY+RuV/jQ+cCXZTKSdDAHjuPmF+op0gGubcI3GYOR7yRmHikhY+h9a6KHRoRsdadfYE8GKtHCd0gec+lbCxMauHyAH/AHU6XK8K61IwNxuzzMrRmKsyVp1j4kKHLxqnwfc5rW3PVoJ/lJT91GbtAySaXOCgRapT/luvo8IXP/Kj4M9jLcNx20j+ID614p0AVKyuKgxFIQy442gFaUlQBk7dKCVmbIQVLnTQb9SOem0Uj8V8fO2jymG0IkJSrPkQVdpIPvKmY22o/wAF3ClF0rVmKl5p8RqPlSjx3g7arkOuAmUBI1gfq1KTy5xlPnVYrrKhG7jYAsuKluuq9qRnWoZTvKiYhXnGoAFOFticDJMk7k6ADbXoTS7h+Dk/4LMfvQEjxzGjjmCPZJUpEyDlEgGORVzPlQnxN5igx5UsNjTh10MyU900yMLmD0rnWGXYSSJhY3B0/wC6NO4qpZS0DBUCVEaZUCAY7ySB6nlUU2sMo1Y3tXgcChAKJy66hUaHQ6EcvKlnGfs+Yc7VufZKmSiSWz4blPlI7qJWz4CQEwABAHQDlVr9NKRpudB4mqRnRNxOZO8M3CHC1+irUsaylJWkjqFjT5+VeV121uMwk67j00JjxrKt7n0S9v7PnO6t0pTIqHDbhOYTtNeY0YJTOxrzAcPLpMcqWMQMalYg2BCdfCpbNPtASR3AfjQrFrP9FQM+qiOyk9+xPd+FEcCslpjMpSs3aJM6ztCfhERp+NNVAD/BmEkFRAgFcqOklITGVPMTqCRy66U/usIy6genyilbDVhBlM6wIHjoI8zTAzdykK2TMT1JMCOtRlsvHQLveGEPAykJ7zuPIHT5UqYjwM/qGocGvIpPhqIPrXUkjSBp+frW6QBQ6meVRx/hWwdt7vI82tsmB2gRMkt6HY+/ypxuVBm2QtKRnASCecbEE7jQb02XLYUkg7fTvpD4juvZlNqO0owUpzdrtLgZugJO/wCFMlbQNRD2G3gcaC4IJ3B7hNeqvwPwrMLwlLbKELEkA5tTlkklQA5jvq+hpA2SPTlQks4HjrIPOIJUkiTqOhj1G1B+GCf/AHaBum4zR19ogH/jTS8ZSR3GlTClBN3dp5FNu5/uSaC0zDGy8DqKttL61TdYjtp1B96OR61iXFckk0oaB2HWKbd1TI91ULbJPwxlUmeeU6+ChW2K2SXFnOkEphxBI17QCFx/Kk+YqzjrK1NZ0phxv9YkdYHbR5pnzArZTyXWkOj4RJ/gUAFeI2V/pql6YlYoAPEI8qGXeJHaa9xO5OZSY1BIPiDH58aFupPWu6LwcDWSs5cEKkfnWrlpiqQSpR7RAGuwA5T461RcaqH2HWk5OKM94KQ5XDWRyw/FNO0QBy1onbXJWtUbNgfzqmPQSfMUlWyUxEx4GrzK1pBKXQZBlMQVTHPyHpXLL08o6ydMeeMvpjs3fhICQdAI/v57+dZSSjE1cwfAVlT/ACK2ha+07h42l2YH6p3ttnu+JJ7wfkRRj7KcADqHLhayEIJECPhEk10X7SOGjfWZQ2B7ZshxqdJI95E8syZHjlpFwdL+H4PdB5tTTinCEpWIOqUwRrqJFddZObwIXF2Lm4u1rPuhRAE6ZUmNO7SB4Cu0cD21vf2qX0pWmFFsgkTKAATpyMzXzwn+3pXb/sAvpYuWCfdcS4PBaQk/NA9azCh+RwwyOSp65jNLeO4JcMpBblxpEEJTJUmDObLGu2sU/wBeGkcbGTo5lhHEi1qXmXqCQANEmCdQPDLTHaYpm0mr+M4JaLlbjYCjHbT2Vk+KfeOu0HekXihpuxbK1XGUK91pfadKeZ7Pu+B9eVTfG0OppjZiGKhKUhtQK1qypO4ECVKjuHzigCLRtd7CUj9QgFazqpbzmiQpW5jeljD8dQstqSQU6ZT5kEa9xPypp4L1Q84TJcuXCfBoBA+c0qY0lSGZ9UafnSqxVUN5d9qACT3CarFbp2THeTFK2ZIIonw/PSlktZcQP/2Wyh5tOT9CKL27DuaS6ANJ0zbfs/8AVUcQaIvLZf8A5UE8+2hJHzQaMTPAwWxI3/PpVgqqq2dBUgVWRiRX9/OgeCD2br1tEpTDjYP+U6VdnwCgoR3ijgNK/F90q2cYuElIIK0LCiBnaMKVl6lKgP56aKvArxkBcZNFl4dFDQ9cugnvy5fQ0suXpp64vW3c2IukGUpAXO0DZc+AJ9K56a6+J2qOPlVOz1d2qo/bL3rVVWrcygiKpdE7K3tldav4Ws9omhbh12otatn2RIFLN4AD3Ls5jrzr2qjhMmsqiWB0z6Vrkf28YpCGWAd+0RPp/t+dB8M4+uraEuKWkbAOj2iPJe49aEcaPO4i4HgUaJgJBOXlqDvyFQOiq2JOan/7F8W9jiKEE9l5Kmz/ABRmT9D60kuYS+nds+WtSYY48w828lC8zS0uDsnXIoKjbnEUAn15ND7zEQkKIKQEznWowhH8R69w+VL3FvGTFojM8uMwlDKCC6sHYqOyE/nfSuGcX8Zv3yoV2GU+4ynRAHUjme8/KsA6Dxb9qiGypFn+td1BfWBlR/40bDxPzrkeJYi4+suPLUtZOpUZ/wC6qpBOgHdp16CmPCsJCAFrAKun7P8AetYaGnBcD9pYsSDmcUhI5EZ3AVeiZ9KYMAvPZuLZQqcrx25e0QCR6oWfWrvD7SvZ24icmdR7v1RR65nAKTOHsSX+nhKgEpeXrpqpISopg8wN9Oprn63Za6o6gyskSTvrUs1G3sK3mphN0GqPED2X2Lh5OtGe4nIf91W0uJmCoA95AoZxoki1WTGicwjX3Clf3UYvJmg8lhR2IAk761ILQ/t+gqG2dnUbKhQ/1Cfvq2FVqMRmyTzUryMfSgvFeDB+3UhsFS0nMgEyZiFAKOwIMeQo9nrVcHnFFOnaA84FfhrhxxmyXbvgHNmhIMjKpIBB8Y+dcPefctH3GSSpKFlMHfL8JHflINfTCWR1P0rl32k8Gh1Zea0d10J0XlAIHcqFAA9xqkJtOyfIlWRTtr1Dicw8+7xotaIBQTNc/tLhbDkxBSYUkiJgwQeldWwtpl9pLjR7KhtzB5pPeKs54OPkXXPgWMkrijjacrZSTRhvBgkTArVWG5tIpZSUmJ2Ex5vWBrWU7W2DJTrGtZTPlN2E3EMRCBCm1FG2bLKZ6a6TQpdq0e01mSSCR7Mnlv2dvSKJYtjKVpbYcaUGwkIKgo+9M54mDqdQZOhqldWYQy2pKwAFlKlJ15iY8jNIl8Hqt23aK6bl9OqXkqHLMI+dWGOJLlv4Af4SDUbbQVIVtMdkwN9TygRy76oNNSTl2HI6+MH8fxo9pCdYOixxHibtzkcW1lKZTmO55wfzzNAFGirzKiCEAk9B050IdaUlUKBB6GinYko9XRKxcKQoKToRtz5RRPCrm4uHkMhRPtFBOsAAfEomNAEySe6gxpucsHLRtpK2gHXpOqu3kJACSAdOXr3UGzJHYeHHkFBUCShIKQqIJBcXK8u4Sop07gKuizCR+qDSuaMwEJnmBHyqjwc8lLQQDqjseOWT9FE+RowtYnSoSVOh0ymnDnSZW8me4beA2qZOEA+88s/wwn8al0r3PFIopDWyIYJbp+DMeqiVE+tQ43h4WwtMQChQgchlOkVeFzULzuYR+ddKKQLKvC/atbdRMn2KAT3oAQf9tEF3IHMUB4Ffz2qJE5VLSR5z99NCMvJIB8B9aMtmTwU03JOwJ8qlS5NSu3aRuRUH6Qg6pBPWBt91AJOnSk/7Q8SLDSHAJAV2v3QBEkeK0CrOM8X27RKM+df+W1ClD+Nz3G/CSe6k/FOLEl4/pGUIUyQG4KtFSMuuipOusap5VWEXdk501Qh4/cIunQtoS4rRSU7qgHtR1ga+FXeEMYVZvZHP8Nwajor4FDx29Kr3mJyDCQlWp7CUJATEHYA848KB3LhJ3mIju7hV3RGrVHX2+LGlbwfOrrXEbJGlcvwvDG3mwrUKmFQSNRz896sPYGECQ4sec1JqF5Qv6ZeDrVli1sQVLcj90CVGsrjfsljZ9XmJrKN8fwb9MyQvA6K1B9DU9uy2GXEZjKlJgcgIMmfOhqhHh0qRt789PxpE6PSaT2e2b8IGcp3iJkz4VbQ2EapHa11JJjNv4bn1NVWG0JXnA7R++r6VgimsWMP5EFqIWk98eoI++hHEP+J5UcLdA+If8QeFNHRHm2RYDeoZfQ6tv2gSZCZy68jty+sUYVia7m7S84ZKnER+6nOMqR3D8TzpYTRbClw42ei0H+oUHs0dHQU4s+28A0gKaH+ICcucfuqGqVA6gjn1BIpjtcbDmiLlCVH4XwGleEzlWe8EUkqC8xg89uVVrnD1LHaiPz1pp8akRjNxOpN/pWhCAodUHMPl/ep0Yg6nsqt3Sf3UK+pFcKdsg2qWyUHqglB/pisVeXEQbh8jp7Z2PTNUfa+yvuWfQTLubdh8dewfrW11cIaQpbo9m2kSVrKUxB5jc187qfdO7rh8XFn6qrLSyzrA7IOup1+cTRXGbudF4a48tbb2rag4Ul5xSFpTmBSTodTPTlRK5+0q1I7KLhfckJaHqok1zBywIVlPI6x4A1bZtu6n9tMTu0Nlxx+6qfY2zTZ/acKn1fyjKmfWhjt9c3B/XvuKH7M5ER0yIhMeVQWtpRFm3SnUmnUEhHNsxi1SgAJAHlVLGMPLqsspSEsuOZlfD7I5jI3IIVHjG1GGCDrS1x0sp9ioTr7VJ6EENkg9RpTvQsdgLErLKhC0hXs1pCkFUTp2ViRvCwpIOkgAxVJy1IbS5I96COYHI1bexVbjbTJjK3ISB+8SfqT61fFulSQFJUCBHuH5mNaQfR5wzcQ8Eclj+oaj5TTHi6IFK7Ft7Fba1SEocQSQPgChmjviaZ8dfSSchJTJykiCROhI5aRSciopxvICIrKmSkGvK52josHrFQK01q04mqrlUKMxDtSB6qSz61ewzDnXiABH7x5eQo0L2N0XyhQ/GnMyknqn8atXtspCinQxzG0dddqHYgdU6zCR9+lPEjzaKzYogwYKT0IPoRVBqrY2rPYsdHQUEa9ZP1NR3gWeRigKOIkjdKye6N+e5qyOJkf5az5D8ataOdppmzlidyDUK7OKkXxEOTK/6fxqs9jv/wBSvMigzKzxVsK9bY1079vx5VUex39w+oqNPEQH/wAXdqaUamFGhACo+IyOc6zPpV63g0tPcQKUICEp1B3rdi8cPxR4AffNGwNMcWWz5eNSKebT7y0jzFKqEE6qK1eKz11FY8hIGgimsHUYbjiC3QNFz4An7qWOJseRchCEIUAhRVmVzkRAA260MujoYqgk0rYVGiZvf871dTfvDZwjyqkmtnFGJH3UtDW0dAxPDirDmnzqVMhRPUgmT8qUFYg4EjZXLnI0p6urlZwgZtEoYQ2kd5AknqSSaQGXNOe30ozWEDjllllrEXI0brKhF4OVe1Lqjotlx41UKZPPuA3PgKssjMQTseVa2VgLhzLmgySSRoEp+FOvOtGNlOWfVGMFaUrIaGRIgntTMEmDsSI2pkwlXsrcqUdTMHugEn6+lVrOxU2VIC/1fQCDIJB15bVVxm7KilA0B27gDH3U8qQnGpPLBWIPZjPUk/dQe5OvlRC6VNDrjelibl0YxvVoVWYqcVmLHQe4Swlq6f8AZOEjslQjTUET8jT7/wDzRj4XHPPL+Fc/4PfKL23I5rynwWlSfvnyrvVqrSlba0NSERf2bI/zF/0//mqj32cRs6v0SfurqArVwUOz+QdV8HFMW4EW2Cr2k+Kf70v8N4J7a5LShITvXauIk/q1eFIv2XWwXd3KjyKR6lX4VuzoLijoHDvCFq0kQy3MblIP1ppZsm0jRtA/0p/CvbZECrArCniWU/sp9B+FRvWzZ3Qn+UVKTVa9eypJ6An0rWY4H9r901+neyaQlIbQM+UASpXaEx0TH81I6hOoqzi96p9915fvOLUo+Z0HkIHlVRKelVRNkjGpAkDx0HrR93Ay0Ul1SC2oSChQUD3TyNLqHCKlLk66T4AfQU10LQ48b8RNuNotmB+rTClc9Y7KfKfWlRhXh0586r1YZuCEZOWYHziKzl2BGPUgJ5VlY8O0fGvaUrZ//9k=" +
              ")"
          }}
          className="col xs-4"
        >
          <div>
            <h1 className={Styles.whiteText}>Women</h1>
          </div>
          {color1 && (
            <div onClick={() => ShopWomen()} className={Styles.colorToggle} />
          )}
        </div>
      </div>
      <div className="row">
        <div
          onClick={() => ShopChildren()}
          onMouseEnter={() => colorToggle2(!color2)}
          onMouseLeave={() => colorToggle2(!color2)}
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "158%",
            height: "33vw",
            backgroundImage:
              "url(" +
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSELqUHUJn2HVXNmWogb-22KgpZECZ-ETjnkiNhaPeede_M12lD" +
              ")"
          }}
          className="col xs-4"
        >
          <div>
            <h1 className={Styles.whiteText}>Children</h1>
          </div>
          {color2 && (
            <div
              onClick={() => ShopChildren()}
              className={Styles.colorToggle}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(Shop);

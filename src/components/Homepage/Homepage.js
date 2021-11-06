import { Link } from "react-router-dom";
import { AiFillPlusCircle, AiFillCaretUp } from "react-icons/ai";
import { GoTrashcan } from "react-icons/go";
import { FiLogIn } from "react-icons/fi";
import { BsEmojiSmile, BsEmojiFrown } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCategoryAsync } from "../../redux/slices/categoriesSlice";
//import { useDispatch } from "react-redux";
//import { homepageSliceActions } from "./homepageSlice";

import classes from "./Homepage.module.css";

const Homepage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [currentInput, setCurrentInput] = useState("");

  const handlerChangeName = (index) => {
    setCurrentInput(index);
  };

  useEffect(() => {
    // for first time array apear
    const res = JSON.parse(localStorage.getItem("categories"));
    setCategoryList(res);
  }, []);

  const dispatch = useDispatch();

  const handlerAddCategories = () => {
    const categories = JSON.parse(localStorage.getItem("categories"));
    console.log(categories);
    const initObj = {
      name: "Change Name",
      description: "Word meaning",
    };
    categories.push(initObj);
    localStorage.setItem("categories", JSON.stringify(categories));
    setCategoryList(categories);
    dispatch(addCategoryAsync(categories));
  };

  const handlerSaveName = (event) => {
    if (event.key === "Enter") {
      const categories = categoryList; // 1. take a copy from categoryList
      categories[currentInput]["name"] = event.target.value; // 2. give data
      setCategoryList(categories); // 3. replace all in categoryList by edited value
      setCurrentInput(-1); // for disable edit mode

      localStorage.setItem("categories", JSON.stringify(categories)); // 4. set data in local
      //       const categories = [
      //       ...categoryList,
      //         {name: event.target.value, description: "Change Description"}
      //       ];
      // setCategoryList(categories)
      // setCategoryList(
      //   (list) => (list[currentInput]["name"] = event.target.value)
      // );
    }
  };

  const deletCategory = (deletIndex) => {
    const list = categoryList.filter((item, index) => {
      return deletIndex !== index;
    });
    setCategoryList(list);

    localStorage.setItem("categories", JSON.stringify(list));
  };

  return (
    <>
      <div className={classes.homepage}>
        <section className={classes.mainbody}>
          <Link className={classes.link} to="/details/:id">
            Homapage to Auth
          </Link>
          <h1>Practice Time !</h1>
          <h3>English words</h3>
          <span>1/2</span>
          <article>
            <div className={classes.slide}></div>
            <button>
              <BsEmojiSmile className={classes.buttonIcon} /> I know it
            </button>
            <button>
              <BsEmojiFrown className={classes.buttonIcon} /> I don't know it
            </button>
          </article>
        </section>
        <section className={classes.aside}>
          <AiFillCaretUp className={classes.fillCarteUp} />
          <div className={classes.headAside}>
            <h3>Flash cards</h3>
            <span onClick={handlerAddCategories}>
              <AiFillPlusCircle className={classes.iconPlus} />
            </span>
          </div>
          {categoryList.map(({ name }, index) => {
            return (
              <article key={index} className={classes.langWrapper}>
                {currentInput === index ? (
                  <div>
                    <input
                      className={classes.input}
                      type="text"
                      onKeyPress={handlerSaveName}
                      placeholder={"Enter a category name"}
                    />
                  </div>
                ) : (
                  <h2 onClick={() => handlerChangeName(index)}>{name}</h2>
                )}

                <h5>Add cards</h5>
                <div className={classes.iconsArticles}>
                  <span>
                    <GoTrashcan onClick={() => deletCategory(index)} />
                  </span>
                  <span>
                    <FiLogIn />
                  </span>
                </div>
              </article>
            );
          })}{" "}
          */
        </section>
      </div>
    </>
  );
};

export default Homepage;

import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    // logs for Debug
    console.log("Params:", catalogName);


    //Fetch all categories
    useEffect(()=> {
       
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);

        // logs to debug
        
console.log("Categories API response:", res?.data?.data);

            // const category_id = 
            // res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;

            // setCategoryId(category_id);
            const categoryItem = res?.data?.data?.find(
              (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
            );
            
            if (categoryItem?._id) {
              setCategoryId(categoryItem._id);
            } else {
              console.log("Category not found for:", catalogName);
            }
        }
        getCategories();
        
        console.log("Categories is:", getCategories);
    },[catalogName]);

    // logs debug 
    


    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }
    
      return (
        <>
          {/* Hero Section */}
          <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-8 md:py-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm overflow-x-auto">
              <p
                className={`px-4 py-2 whitespace-nowrap ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Popular
              </p>
              <p
                className={`px-4 py-2 whitespace-nowrap ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
              />
            </div>
          </div>
          {/* Section 2 */}
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-8 md:py-12 lg:max-w-maxContent">
            <div className="section_heading">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className="py-6 md:py-8">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.courses}
              />
            </div>
          </div>
    
          {/* Section 3 */}
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-8 md:py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-6 md:py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 6)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[250px] md:h-[300px] lg:h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>
    
          <Footer />
        </>
      )
    }
    
    export default Catalog
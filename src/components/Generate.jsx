import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';

import { useLazyGetSummaryQuery } from '../services/article';

//NotReadnAllDat (nRad)

const Generate = () => {
    const [article, setArticle] = useState({
        url: '',
        summary: '',
    });
    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState("");

    // getSummary hook
    const [getSummary, { error, isFetching }] = // gives us the ability to see whether we got and error or if it's still fetching
        useLazyGetSummaryQuery();

    useEffect(() => { // so recent articles aren't lost on page refresh
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles')) 
        // we are saving recent articles to local storage (though here we are only getting, our update logic is below) 

        if(articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage);
        }
    }, []);

    const handleSubmit = async (e) => {
        //alert('Submitted!');
        e.preventDefault(); // prevents default behavior of the browser, which is to reload the application
        const { data } = await getSummary({ articleUrl: article.url});
        
        //https://time.com/6266679/musk-ai-open-letter/

        if(data?.summary) { // check if we got something out of it
            const newArticle = { ...article, summary: data.summary }; // "..." means you extract the properties
            const updatedAllArticles = [newArticle, ...allArticles]; // push new article to array of recents

            setArticle(newArticle);
            setAllArticles(updatedAllArticles);

            localStorage.setItem('articles', JSON.stringify(updatedAllArticles)); // update local storage with new list of articles

            //console.log(newArticle);
        }
    } 

    const handleCopy = (copyUrl) => { // so we have an easy way to copy previous URLs so we can revist the actual articles
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 3000); // resets what is to be copied after 3 seconds
    }


  return (
    <section className="mt-16 w-full max-x-xl">
        {/* Search */}
        <div className="flex flex-col w-full gap-2">
            <form 
                className="relative flex justify-center items-center"
                onSubmit={handleSubmit}    
            >
                <img
                    src={linkIcon}
                    alt="link_icon"
                    className="absolute left-0 my-0 ml-3 w-5"
                />

                <input
                    type="url"
                    placeholder="Paste your article URL here"
                    value={article.url}
                    onChange={(e) => setArticle({
                        article, 
                        url: e.target.value
                    })}
                    required
                    className="url_input peer"
                />

                <button
                    type="submit"
                    className="submit_btn 
                        peer-focus:border-gray-700
                        peer-focus:text-gray-700"
                        
                >
                    ↵
                </button>
            </form>

            {/* Browse URL History */}
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                {allArticles.map((item, index) => (
                    <div 
                        key={`link-${index}`}
                        onClick={() => setArticle(item)} /* Allows us to simply click an older recent url, and load the summary aoutmatically without making another API call */
                        className="link_card"
                    > 
                        <div className="copy_btn" onClick={() => handleCopy(item.url)}> {/* Allows us to copy the url in case we want to go back to it */}
                            <img 
                                src={copied === item.url ? tick : copy} // show copy icon only if not copied, otheriwse show tick
                                alt="copy_icon"
                                className="w-[40%] h-[40%] object-contain"
                            />
                        </div>
                        <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                            {item.url}
                        </p>
                    </div>
                ))}
            </div>
        </div>

        {/* Display Results */}
        <div className="my-10 max-w-full flex justify-center items-center">
            {isFetching ? (
                <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
            ) : error ? (
                <p className="font-inter font-bold text-black text-center">
                    {`Oops! That certainly wasn't supposed to happen...`}
                    <br />
                    <span className="font-satoshi font-normal text-gray-700">
                        {error?.data?.error}
                    </span>
                </p>
            ) : (
                article.summary && (
                    <div className="flex flex-col gap-3">
                        <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                            Article <span className="blue_gradient">Summary</span>
                        </h2>
                        <div className="summary_box">
                            <p className="font-inter font-medium text-sm text-gray-700">
                                {article.summary}
                            </p>
                        </div>
                    </div>
                )
            )}
        </div>
    </section>
  )
}

export default Generate
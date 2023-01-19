import { normalize as normalizeProduct } from '../../../../utils/product';
// Get products for the product list page. Search and category filter implemented. Sort and brand filter not implemented.
const getProducts = async ({ req , res , body: { search , categoryId , brandId , sort  } , config: { restBuyerFetch , cartCookie , tokenCookie  } ,  })=>{
    var ref;
    //Use a dummy base as we only care about the relative path
    const url = new URL('/me/products', 'http://a');
    if (search) {
        url.searchParams.set('search', search);
    }
    if (categoryId) {
        url.searchParams.set('categoryID', String(categoryId));
    }
    // Get token from cookies
    const token = req.cookies[tokenCookie];
    var rawProducts = await restBuyerFetch('GET', url.pathname + url.search, null, {
        token
    });
    const products = rawProducts.Items.map(normalizeProduct);
    const found = (rawProducts === null || rawProducts === void 0 ? void 0 : (ref = rawProducts.Items) === null || ref === void 0 ? void 0 : ref.length) > 0;
    res.status(200).json({
        data: {
            products,
            found
        }
    });
};
export default getProducts;

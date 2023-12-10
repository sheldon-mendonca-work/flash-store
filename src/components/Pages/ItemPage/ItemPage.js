const ItemPage = (props) => {
    const {item} = props;
    const {_id, title, author, price, imgLink} = item;
    

    return <div key={_id}>
        <img src= {imgLink} alt={title} />
        <p>{title}</p>
        <p>{author}</p>
        <p>{price}</p>
        <button>Add to Cart</button>
        <button>Heart</button>
    </div>
}

export default ItemPage;
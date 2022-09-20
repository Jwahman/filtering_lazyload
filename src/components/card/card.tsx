import { User } from "../../models/user";
import styles from './card.module.css';
import phoneImg from '../../assets/phone.svg';
import mailImg from '../../assets/mail.svg';

function Card(props: { user: User, color: string, grid: boolean }) {
    const { name, picture, location, email, phone } = props.user;
    return props.grid ? <div style={{ backgroundColor: props.color }} className={styles.card}>
        <div className={styles.content}>
            <p>{name.first} {name.last}</p>
            <img aria-label="profile picture" src={picture.medium} className={styles.profilePicture} />
            <span className={styles.location}>{location.city}</span>
            <div className={styles.contact}>
                <a href={`mailto:${email}`}><img src={phoneImg} /></a>
                <a href={`tel:${phone}`}><img src={mailImg} /></a>
            </div>
        </div>
        <div className={styles.cardBottom}>&nbsp;</div>
        <div className={styles.cardTop}>
            <div style={{ backgroundColor: props.color }} className={styles.overlay}>&nbsp;</div>
        </div>

    </div> : <div style={{ backgroundColor: props.color }} className={styles.listCard}>
        <div className={styles.listContent}>
        <img aria-label="profile picture" src={picture.medium} className={styles.listPicture} />
        <div className={styles.info}>
            <p>{name.first} {name.last}</p>
            <span className={styles.location}>{location.city}</span>
        </div>
        <div className={styles.contactList}>
            <a href={`mailto:${email}`}><img src={phoneImg} /></a>
            <a href={`tel:${phone}`}><img src={mailImg} /></a>
        </div>
        </div>
        <div className={styles.whiteBgList}>&nbsp;</div>
    </div>


}

export default Card;
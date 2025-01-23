import { Column, Table, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, HasMany } from "sequelize-typescript";
import Book from "./Books";

//title, authorId proofRead isbn  genreId
@Table({ timestamps: true })
class Author extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
	declare id: string;

	@Column({ type: DataType.STRING, allowNull: true })
	declare name: string;

	@Column({ type: DataType.INTEGER })
	declare age: number;

	@HasMany(() => Book, "bookId")
	declare books: Book[];
}

export default Author;
